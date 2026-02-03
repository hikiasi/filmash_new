
import React from 'react';
import { Car } from '../types';
import { ChevronRight } from 'lucide-react';

interface CatalogProps {
  cars: Car[];
  exchangeRate: number;
  onSelect: (car: Car) => void;
}

const Catalog: React.FC<CatalogProps> = ({ cars, exchangeRate, onSelect }) => {
  const formatPrice = (cny: number) => {
    const rub = cny * exchangeRate;
    return {
      cny: cny.toLocaleString() + ' ¥',
      rub: rub.toLocaleString() + ' ₽'
    };
  };

  return (
    <section>
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Каталог <span className="text-zinc-600">Premium</span></h1>
        <p className="text-zinc-400 max-w-2xl text-lg">Выбирайте из лучших предложений китайского автопрома. Каждая модель доступна для полной кастомизации под ваш стиль.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map(car => {
          const prices = formatPrice(car.basePriceCNY);
          return (
            <div 
              key={car.id} 
              className="group bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-500 transition-all cursor-pointer flex flex-col"
              onClick={() => onSelect(car)}
            >
              <div className="aspect-[16/10] overflow-hidden bg-zinc-800">
                <img 
                  src={car.mainImage} 
                  alt={car.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold block mb-1">{car.brand}</span>
                    <h3 className="text-3xl font-bold">{car.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">{prices.rub}</div>
                    <div className="text-sm text-zinc-500 font-medium">от {prices.cny}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-zinc-800/50 border border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 uppercase block mb-1">Разгон</span>
                    <span className="font-bold">{car.specs.acceleration}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-zinc-800/50 border border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 uppercase block mb-1">Запас хода</span>
                    <span className="font-bold">{car.specs.range}</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <button className="text-sm font-bold flex items-center gap-2 group-hover:gap-4 transition-all bg-white text-black px-6 py-3 rounded-full">
                    Конфигуратор
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Catalog;
