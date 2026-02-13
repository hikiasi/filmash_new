'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, Compass } from 'lucide-react';
import PriceFormatter from '@/components/shared/PriceFormatter';
import { CatalogItem } from '@/types/catalog';

interface CarCardProps {
  car: CatalogItem;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const carLink = `/catalog/${car.brand.toLowerCase()}/${car.model.toLowerCase().replace(/ /g, '-')}`;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-primary/50 transition-all flex flex-col shadow-lg hover:shadow-2xl hover:shadow-primary/20"
    >
      <Link href={carLink} className="flex flex-col h-full">
        {/* Image Section */}
        <div className="aspect-[16/10] overflow-hidden bg-zinc-800 relative">
          {car.imageUrl ? (
            <Image
              src={car.imageUrl}
              alt={`${car.brand} ${car.name}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center text-zinc-600">
               <span className="material-symbols-outlined text-5xl">directions_car</span>
            </div>
          )}
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1">{car.brand}</span>
              <h3 className="text-3xl font-bold text-white">{car.name}</h3>
            </div>
            <PriceFormatter priceCny={car.minPriceCny} />
          </div>

          {/* Specs Section */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-zinc-800 border border-zinc-700/50">
              <span className="text-[10px] text-zinc-400 uppercase block mb-1">Мощность</span>
              <span className="font-bold text-white text-lg">{car.specifications.power || 'N/A'} л.с.</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-800 border border-zinc-700/50">
              <span className="text-[10px] text-zinc-400 uppercase block mb-1">Запас хода</span>
              <span className="font-bold text-white text-lg">{car.specifications.range || 'N/A'} км</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-auto">
             <div className="text-sm font-bold flex items-center justify-center gap-2 text-black bg-white rounded-full px-6 py-3 group-hover:gap-4 group-hover:bg-primary group-hover:text-white transition-all">
              Конфигуратор
              <ChevronRight size={18} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CarCard;
