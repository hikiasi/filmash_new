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
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all flex flex-col shadow-lg hover:shadow-2xl hover:shadow-primary/10"
    >
      <Link href={carLink} className="flex flex-col h-full">
        <div className="aspect-[16/10] overflow-hidden bg-zinc-800 relative">
          {car.imageUrl ? (
            <Image
              src={car.imageUrl}
              alt={`${car.brand} ${car.name}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600">
              {/* Placeholder for when image is not available */}
              <span>Image Coming Soon</span>
            </div>
          )}
        </div>
        <div className="p-6 md:p-8 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold block mb-1">{car.brand}</span>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">{car.name}</h3>
            </div>
            <PriceFormatter priceCny={car.minPriceCny} className="text-right" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="p-3 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex items-center gap-2">
              <Zap size={16} className="text-primary" />
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">Мощность</span>
                <span className="font-bold">{car.specifications.power || 'N/A'} л.с.</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex items-center gap-2">
              <Compass size={16} className="text-primary" />
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">Запас хода</span>
                <span className="font-bold">{car.specifications.range || 'N/A'} км</span>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <div className="text-sm font-bold flex items-center gap-2 text-primary group-hover:gap-4 transition-all">
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
