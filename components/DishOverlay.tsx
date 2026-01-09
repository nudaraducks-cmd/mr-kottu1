
import React from 'react';
import { DishInfo } from '../types';

interface DishOverlayProps {
  dish: DishInfo;
  onClose: () => void;
}

export const DishOverlay: React.FC<DishOverlayProps> = ({ dish, onClose }) => {
  return (
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="relative h-48 bg-gradient-to-br from-amber-900/40 to-zinc-900 flex items-center justify-center">
          <img 
            src={`https://picsum.photos/seed/${dish.name}/600/400`} 
            alt={dish.name}
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="z-10 text-center">
             <h2 className="text-3xl font-serif text-amber-100 px-6">{dish.name}</h2>
             <div className="mt-2 text-amber-400 font-semibold tracking-wide">{dish.price}</div>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-zinc-400 text-sm leading-relaxed italic">
            "{dish.description}"
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-800/50 p-3 rounded-xl border border-white/5">
              <span className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Calories</span>
              <span className="text-sm font-semibold text-zinc-200">{dish.calories || '650 kcal'}</span>
            </div>
            {dish.pairing && (
              <div className="bg-zinc-800/50 p-3 rounded-xl border border-white/5">
                <span className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Chef's Pairing</span>
                <span className="text-sm font-semibold text-amber-400">{dish.pairing}</span>
              </div>
            )}
          </div>

          <div>
             <span className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-2">Ingredients</span>
             <div className="flex flex-wrap gap-2">
               {dish.ingredients.map((item, i) => (
                 <span key={i} className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300 border border-white/5">
                   {item}
                 </span>
               ))}
             </div>
          </div>

          <button 
            onClick={() => alert('Item added to order!')}
            className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-95"
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
};
