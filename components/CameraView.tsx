
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { geminiService } from '../services/geminiService';
import { MenuAnalysis } from '../types';

interface CameraViewProps {
  onMenuAnalyzed: (data: MenuAnalysis) => void;
  onError: (msg: string) => void;
  isScanning: boolean;
  setIsScanning: (val: boolean) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ 
  onMenuAnalyzed, 
  onError, 
  isScanning,
  setIsScanning 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }, 
        audio: false 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      onError("Camera access denied.");
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const captureFullPage = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsScanning(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      
      try {
        const analysis = await geminiService.analyzeMenuPage(imageData);
        onMenuAnalyzed(analysis);
      } catch (err) {
        console.error(err);
        onError("Failed to read menu. Ensure text is clear and well-lit.");
      } finally {
        setIsScanning(false);
      }
    }
  }, [onMenuAnalyzed, onError, setIsScanning]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover opacity-90" />
      <canvas ref={canvasRef} className="hidden" />

      {/* AR Framing Overlay - Page Style */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
        <div className="w-[80%] h-[70%] border border-white/20 rounded-lg relative overflow-hidden bg-white/5">
           {/* Scanline Effect removed as requested */}
        </div>
        <p className="mt-6 text-white bg-black/40 px-4 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold">
          Align Menu Page within Frame
        </p>
      </div>

      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <button 
          onClick={captureFullPage}
          disabled={isScanning}
          className="relative flex flex-col items-center gap-2 group"
        >
          <div className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center p-1 group-hover:border-amber-500 transition-all">
            <div className={`w-full h-full rounded-full ${isScanning ? 'bg-amber-500' : 'bg-white'} transition-all flex items-center justify-center`}>
               {isScanning && <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
            </div>
          </div>
          <span className="text-white text-[10px] font-bold tracking-widest uppercase opacity-60">
            {isScanning ? 'Digitizing...' : 'Scan Menu'}
          </span>
        </button>
      </div>
    </div>
  );
};
