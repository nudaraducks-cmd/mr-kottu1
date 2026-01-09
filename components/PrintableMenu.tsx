
import React from 'react';
import { SAMPLE_DISHES } from '../constants';

export const PrintableMenu: React.FC = () => {
  return (
    <div className="bg-white p-12 min-h-screen text-black flex flex-col items-center">
      <div className="max-w-2xl w-full border-[12px] border-double border-zinc-200 p-12 relative">
        {/* Aesthetic Corner Markers for the Camera AI */}
        <div className="absolute -top-4 -left-4 w-12 h-12 border-t-8 border-l-8 border-black"></div>
        <div className="absolute -top-4 -right-4 w-12 h-12 border-t-8 border-r-8 border-black"></div>
        <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-8 border-l-8 border-black"></div>
        <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-8 border-r-8 border-black"></div>

        <header className="text-center mb-16">
          <h1 className="text-5xl font-serif mb-4 tracking-tighter">L'ARISTO</h1>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Augmented Dining Experience</p>
        </header>

        <section className="space-y-12">
          <div>
            <h2 className="text-center text-lg font-semibold tracking-widest uppercase mb-8 border-b border-zinc-100 pb-2">Entrées</h2>
            {SAMPLE_DISHES.map((dish) => (
              <div key={dish.id} className="mb-10 group flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-amber-600 transition-colors">{dish.name}</h3>
                  <p className="text-sm text-zinc-600 leading-snug">{dish.description}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold">{dish.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-zinc-100">
             <div className="bg-zinc-50 p-6 rounded-lg text-center">
                <p className="text-[10px] uppercase tracking-widest mb-2 font-bold">Interactive Experience</p>
                <p className="text-xs text-zinc-500 mb-4 italic">Scan this menu with the Aristo App to see ingredients, nutrition, and pairings in Augmented Reality.</p>
                <div className="w-24 h-24 bg-black mx-auto rounded-lg flex items-center justify-center text-white font-bold text-xs">
                   [AR CODE]
                </div>
             </div>
          </div>
        </section>

        <footer className="mt-20 text-center text-[9px] uppercase tracking-widest text-zinc-400">
          Crafted with Gemini AI &middot; 2024
        </footer>
      </div>

      <div className="mt-12 print:hidden">
        <button 
          onClick={() => window.print()}
          className="px-8 py-3 bg-zinc-900 text-white rounded-full font-semibold hover:bg-zinc-700 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          Print Physical Menu
        </button>
      </div>
    </div>
  );
};
