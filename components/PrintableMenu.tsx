
import React from 'react';
import { SAMPLE_DISHES } from '../constants';

export const PrintableMenu: React.FC = () => {
  const handlePrint = () => {
    // Ensuring the document is ready before calling print
    if (typeof window !== 'undefined') {
      window.focus();
      window.print();
    }
  };

  return (
    <div className="bg-white p-4 sm:p-12 min-h-screen text-black flex flex-col items-center">
      {/* Instructions for the user - hidden during print */}
      <div className="print-hidden mb-8 max-w-2xl w-full bg-amber-50 p-6 rounded-2xl border border-amber-200 text-amber-900 text-sm shadow-sm flex items-start gap-4">
        <div className="bg-amber-100 p-2 rounded-full">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div>
          <p className="font-bold mb-1">To download as PDF:</p>
          <ol className="list-decimal list-inside space-y-1 opacity-90">
            <li>Click the "Save as PDF" button below.</li>
            <li>In the print window, change <b>Destination</b> to <b>"Save as PDF"</b>.</li>
            <li>Click Save.</li>
          </ol>
        </div>
      </div>

      <div className="max-w-2xl w-full border-[12px] border-double border-zinc-200 p-8 sm:p-12 relative bg-white shadow-xl sm:shadow-none">
        {/* Aesthetic Corner Markers for the Camera AI */}
        <div className="absolute -top-4 -left-4 w-12 h-12 border-t-8 border-l-8 border-black"></div>
        <div className="absolute -top-4 -right-4 w-12 h-12 border-t-8 border-r-8 border-black"></div>
        <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-8 border-l-8 border-black"></div>
        <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-8 border-r-8 border-black"></div>

        <header className="text-center mb-16">
          <h1 className="text-5xl font-serif mb-4 tracking-tighter">L'ARISTO</h1>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold">Augmented Dining Experience</p>
        </header>

        <section className="space-y-12">
          <div>
            <h2 className="text-center text-lg font-bold tracking-widest uppercase mb-8 border-b border-zinc-100 pb-2">Entrées</h2>
            {SAMPLE_DISHES.map((dish) => (
              <div key={dish.id} className="mb-10 group flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <h3 className="text-xl font-bold mb-1">{dish.name}</h3>
                  <p className="text-sm text-zinc-600 leading-snug">{dish.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-lg">{dish.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-zinc-100">
             <div className="bg-zinc-50 p-6 rounded-lg text-center border border-zinc-200">
                <p className="text-[10px] uppercase tracking-widest mb-2 font-bold">Interactive Experience</p>
                <p className="text-xs text-zinc-500 mb-4 italic font-medium">Scan this menu with the Aristo App to see ingredients, nutrition, and pairings in Augmented Reality.</p>
                <div className="w-24 h-24 bg-black mx-auto rounded-lg flex items-center justify-center text-white font-bold text-xs uppercase tracking-tighter">
                   AR CODE
                </div>
             </div>
          </div>
        </section>

        <footer className="mt-20 text-center text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
          Crafted with Gemini AI &middot; 2024
        </footer>
      </div>

      <div className="mt-12 mb-20 print-hidden flex flex-col items-center gap-4">
        <button 
          onClick={handlePrint}
          className="px-12 py-5 bg-black text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all flex items-center gap-3 shadow-2xl active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Save as PDF
        </button>
      </div>
    </div>
  );
};
