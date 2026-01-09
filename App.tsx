
import React, { useState } from 'react';
import { CameraView } from './components/CameraView';
import { MenuExplorer } from './components/MenuExplorer';
import { PrintableMenu } from './components/PrintableMenu';
import { AppMode, MenuAnalysis } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.HOME);
  const [analysisData, setAnalysisData] = useState<MenuAnalysis | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMenuAnalyzed = (data: MenuAnalysis) => {
    setAnalysisData(data);
    setError(null);
  };

  const handleError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 4000);
  };

  if (mode === AppMode.PRINT) {
    return (
      <div className="relative">
        <button 
          onClick={() => setMode(AppMode.HOME)}
          className="fixed top-6 left-6 z-[100] px-6 py-2 bg-black text-white rounded-full font-bold shadow-xl border border-white/10 print:hidden"
        >
          ← Exit Template
        </button>
        <PrintableMenu />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#070707] text-white flex flex-col items-center justify-center overflow-hidden">
      {mode === AppMode.HOME && (
        <div className="max-w-md w-full px-10 text-center animate-in fade-in slide-in-from-bottom duration-700">
          <div className="w-24 h-24 bg-amber-500/10 rounded-3xl mx-auto mb-8 flex items-center justify-center border border-amber-500/20">
             <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          
          <h1 className="text-5xl font-serif text-white mb-4 tracking-tight italic">Aristo AR</h1>
          <p className="text-zinc-500 uppercase tracking-[0.4em] text-[10px] mb-12">The Interactive Menu Reader</p>

          <div className="space-y-4">
            <button 
              onClick={() => setMode(AppMode.SCANNER)}
              className="w-full py-5 bg-white text-black font-bold rounded-2xl hover:bg-amber-400 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              Scan Menu Page
            </button>
            <button 
              onClick={() => setMode(AppMode.PRINT)}
              className="w-full py-5 bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold rounded-2xl hover:bg-zinc-800 transition-all active:scale-95"
            >
              Menu Template
            </button>
          </div>

          <p className="mt-12 text-zinc-500 text-[11px] leading-relaxed max-w-[240px] mx-auto italic">
            Point your camera at a menu to digitize the entire selection instantly.
          </p>
        </div>
      )}

      {mode === AppMode.SCANNER && (
        <div className="w-full h-full relative">
          <CameraView 
            onMenuAnalyzed={handleMenuAnalyzed}
            onError={handleError}
            isScanning={isScanning}
            setIsScanning={setIsScanning}
          />
          
          <button 
            onClick={() => setMode(AppMode.HOME)}
            className="absolute top-6 left-6 p-3 bg-black/40 text-white rounded-full border border-white/10 backdrop-blur-md"
          >
            ← Back
          </button>

          {error && (
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-4/5 bg-red-600/90 text-white px-6 py-4 rounded-2xl text-center text-xs font-bold shadow-2xl animate-in slide-in-from-top z-50">
              {error}
            </div>
          )}

          {analysisData && (
            <MenuExplorer 
              data={analysisData} 
              onClose={() => setAnalysisData(null)} 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
