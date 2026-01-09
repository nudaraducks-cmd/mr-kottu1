
import React, { useState } from 'react';
import { CameraView } from './components/CameraView';
import { DishOverlay } from './components/DishOverlay';
import { PrintableMenu } from './components/PrintableMenu';
import { AppMode, DishInfo } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.HOME);
  const [detectedDish, setDetectedDish] = useState<DishInfo | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDishDetected = (dish: DishInfo) => {
    setDetectedDish(dish);
    setError(null);
  };

  const handleError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 3000);
  };

  if (mode === AppMode.PRINT) {
    return (
      <div>
        <div className="fixed top-4 left-4 z-[100] print:hidden">
          <button 
            onClick={() => setMode(AppMode.HOME)}
            className="p-3 bg-zinc-900 text-white rounded-full shadow-lg hover:bg-zinc-800"
          >
            ← Back
          </button>
        </div>
        <PrintableMenu />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center">
      {mode === AppMode.HOME && (
        <div className="max-w-md w-full px-8 text-center animate-in fade-in zoom-in duration-500">
          <header className="mb-12">
            <h1 className="text-6xl font-serif text-amber-500 mb-2">L'Aristo</h1>
            <p className="text-zinc-500 uppercase tracking-[0.4em] text-[10px]">The Future of Dining</p>
          </header>

          <div className="space-y-4">
            <button 
              onClick={() => setMode(AppMode.SCANNER)}
              className="w-full py-5 bg-amber-500 text-black font-bold rounded-3xl shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:bg-amber-400 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
              Launch AR Scanner
            </button>
            <button 
              onClick={() => setMode(AppMode.PRINT)}
              className="w-full py-5 border border-zinc-800 bg-zinc-900/50 text-zinc-300 font-bold rounded-3xl hover:bg-zinc-800 transition-all active:scale-95"
            >
              Create Menu Template
            </button>
          </div>

          <p className="mt-12 text-zinc-600 text-xs leading-relaxed max-w-[280px] mx-auto">
            Point your camera at any dish on our menu to unlock immersive 3D descriptions and pairings.
          </p>
        </div>
      )}

      {mode === AppMode.SCANNER && (
        <div className="w-full h-full relative">
          <CameraView 
            onDishDetected={handleDishDetected}
            onError={handleError}
            isScanning={isScanning}
            setIsScanning={setIsScanning}
          />
          
          <button 
            onClick={() => setMode(AppMode.HOME)}
            className="absolute top-6 left-6 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all border border-white/10"
          >
            ← Home
          </button>

          {error && (
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-3/4 bg-red-500/90 text-white px-4 py-3 rounded-2xl text-center text-sm font-semibold shadow-xl animate-in fade-in slide-in-from-top duration-300 z-50">
              {error}
            </div>
          )}

          {detectedDish && (
            <DishOverlay 
              dish={detectedDish} 
              onClose={() => setDetectedDish(null)} 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
