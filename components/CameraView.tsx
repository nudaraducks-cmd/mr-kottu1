
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { geminiService } from '../services/geminiService';
import { DishInfo } from '../types';

interface CameraViewProps {
  onDishDetected: (dish: DishInfo) => void;
  onError: (msg: string) => void;
  isScanning: boolean;
  setIsScanning: (val: boolean) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ 
  onDishDetected, 
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
        video: { facingMode: 'environment' }, 
        audio: false 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      onError("Camera access denied or not available.");
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const captureFrame = useCallback(async () => {
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
        const dish = await geminiService.identifyDish(imageData);
        onDishDetected(dish);
      } catch (err) {
        console.error(err);
        onError("Could not identify the item. Please center the dish name in the frame.");
      } finally {
        setIsScanning(false);
      }
    }
  }, [onDishDetected, onError, setIsScanning]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="w-full h-full object-cover opacity-80"
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* AR Framing Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
        <div className="w-64 h-64 border-2 border-dashed border-white/50 rounded-2xl relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-amber-400 rounded-tl-xl -translate-x-1 -translate-y-1"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-amber-400 rounded-tr-xl translate-x-1 -translate-y-1"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-amber-400 rounded-bl-xl -translate-x-1 translate-y-1"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-amber-400 rounded-br-xl translate-x-1 translate-y-1"></div>
          
          {isScanning && (
            <div className="absolute left-0 w-full h-1 bg-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.8)] scanner-line"></div>
          )}
        </div>
        <p className="mt-8 text-white/80 font-medium text-sm tracking-widest uppercase">Center Dish in Frame</p>
      </div>

      {/* Capture Button */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center px-8">
        <button 
          onClick={captureFrame}
          disabled={isScanning}
          className={`
            group relative p-1 rounded-full border-4 border-white transition-all active:scale-95
            ${isScanning ? 'opacity-50 cursor-not-allowed' : 'hover:border-amber-400'}
          `}
        >
          <div className={`
            w-16 h-16 rounded-full transition-all
            ${isScanning ? 'bg-amber-400' : 'bg-white group-hover:bg-amber-400'}
          `}></div>
          {isScanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
