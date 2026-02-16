'use client';

import { useConfiguratorStore } from '@/lib/store/configurator-store';
import { motion, AnimatePresence } from 'framer-motion';
import ImageOptimized from '@/components/shared/ImageOptimized';

export function ImageGallery() {
  const { selectedColor, selectedInterior, selectedTrim } = useConfiguratorStore();

  const mainImage = selectedColor?.image_url || selectedTrim?.colors?.[0]?.image_url;
  const interiorImage = selectedInterior?.image_url;

  return (
    <div className="space-y-6">
      <div className="relative aspect-[16/10] bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={mainImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {mainImage ? (
              <ImageOptimized
                src={mainImage}
                alt="Car Exterior"
                fill
                imgClassName="object-cover"
                className="w-full h-full"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-700">
                Нет изображения экстерьера
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 group cursor-pointer">
             <ImageOptimized
                src={mainImage || '/placeholder-car.jpg'}
                alt="Exterior Thumbnail"
                fill
                imgClassName="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                className="w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-black/50 px-2 py-1 rounded text-white">Экстерьер</span>
              </div>
        </div>
        <div className="relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 group cursor-pointer">
             {interiorImage ? (
                <ImageOptimized
                    src={interiorImage}
                    alt="Interior Thumbnail"
                    fill
                    imgClassName="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    className="w-full h-full"
                />
             ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                    Нет фото салона
                </div>
             )}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-black/50 px-2 py-1 rounded text-white">Интерьер</span>
              </div>
        </div>
      </div>
    </div>
  );
}
