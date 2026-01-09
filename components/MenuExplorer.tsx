
import React, { useState } from 'react';
import { MenuAnalysis, DishInfo } from '../types';

interface MenuExplorerProps {
  data: MenuAnalysis;
  onClose: () => void;
}

export const MenuExplorer: React.FC<MenuExplorerProps> = ({ data, onClose }) => {
  const [selectedDish, setSelectedDish] = useState<DishInfo | null>(null);

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-md animate-in fade-in duration-500">
      <header className="p-6 flex justify-between items-center border-b border-white/10 bg-black/40">
        <div>
          <h2 className="text-amber-500 font-serif text-2xl">{data.restaurantName}</h2>
          <p className="text-zinc-400 text-[10px] tracking-widest uppercase">Augmented Menu View</p>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white"
        >
          ✕
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-24">
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl mb-6">
          <p className="text-amber-200 text-sm italic">"{data.summary}"</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {data.dishes.map((dish) => (
            <div 
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl flex justify-between items-center group active:scale-95 transition-all cursor-pointer hover:border-amber-500/50"
            >
              <div className="flex-1">
                <h3 className="text-white font-bold group-hover:text-amber-400 transition-colors">{dish.name}</h3>
                <p className="text-zinc-500 text-xs line-clamp-1">{dish.description}</p>
              </div>
              <div className="text-amber-500 font-mono font-bold ml-4">{dish.price}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedDish && (
        <div className="absolute inset-0 bg-black/90 z-[60] p-6 flex items-center justify-center animate-in zoom-in duration-300">
          <div className="bg-zinc-900 w-full max-w-sm rounded-3xl overflow-hidden border border-zinc-800">
             <div className="h-40 relative">
               <img src={`https://picsum.photos/seed/${selectedDish.name}/400/250`} className="w-full h-full object-cover opacity-60" />
               <button onClick={() => setSelectedDish(null)} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white">✕</button>
             </div>
             <div className="p-6">
                <h3 className="text-2xl font-serif text-amber-500 mb-2">{selectedDish.name}</h3>
                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{selectedDish.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedDish.ingredients.slice(0, 4).map(ing => (
                    <span key={ing} className="px-2 py-1 bg-zinc-800 rounded-lg text-[10px] text-zinc-400">{ing}</span>
                  ))}
                </div>

                {selectedDish.pairing && (
                  <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl mb-6">
                    <span className="text-[10px] text-amber-500 font-bold uppercase block mb-1">Pair with</span>
                    <span className="text-zinc-300 text-sm font-medium">{selectedDish.pairing}</span>
                  </div>
                )}

                <button 
                  onClick={() => setSelectedDish(null)}
                  className="w-full py-4 bg-amber-500 text-black font-bold rounded-xl"
                >
                  Back to Menu
                </button>
             </div>
          </div>
        </div>
      )}
      
      <div className="p-6 bg-gradient-to-t from-black to-transparent">
         <p className="text-center text-zinc-600 text-[10px] uppercase tracking-widest">Tap items to explore details</p>
      </div>
    </div>
  );
};
