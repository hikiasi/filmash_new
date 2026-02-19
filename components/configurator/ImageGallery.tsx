'use client';

import { useConfiguratorStore } from '@/lib/store/configurator-store';
import { motion, AnimatePresence } from 'framer-motion';
import ImageOptimized from '@/components/shared/ImageOptimized';
import { useState, useEffect } from 'react';

export function ImageGallery() {
  const { selectedColor, selectedWheels, selectedInterior, selectedSteeringWheel, selectedTrim } = useConfiguratorStore();
  const [view, setView] = useState<'exterior' | 'interior'>('exterior');

  // Improved logic: try to find exact match, then fallback to just color/interior match
  const exteriorImage = (
    selectedTrim?.config_images?.find((img: any) =>
      img.type === 'exterior' &&
      img.color_id === selectedColor?.id &&
      img.wheel_id === selectedWheels?.id
    ) ||
    selectedTrim?.config_images?.find((img: any) =>
      img.type === 'exterior' &&
      img.color_id === selectedColor?.id &&
      !img.wheel_id
    ) ||
    selectedTrim?.config_images?.find((img: any) =>
      img.type === 'exterior'
    )
  )?.image_url || '/placeholder-car.jpg';

  const interiorImage = (
    selectedTrim?.config_images?.find((img: any) =>
      img.type === 'interior' &&
      img.interior_id === selectedInterior?.id &&
      img.steering_wheel_id === selectedSteeringWheel?.id
    ) ||
    selectedTrim?.config_images?.find((img: any) =>
      img.type === 'interior' &&
      img.interior_id === selectedInterior?.id &&
      !img.steering_wheel_id
    ) ||
    selectedTrim?.config_images?.find((img: any) =>
      img.type === 'interior'
    )
  )?.image_url || '/placeholder-car.jpg';

  const currentImage = view === 'exterior' ? exteriorImage : interiorImage;

  return (
    <div className="space-y-6">
      <div className="relative aspect-[16/10] bg-black rounded-[2.5rem] overflow-hidden border border-zinc-900 shadow-2xl">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {currentImage ? (
              <ImageOptimized
                src={currentImage}
                alt="Car Preview"
                fill
                imgClassName="object-contain scale-90"
                className="w-full h-full"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-800 font-black uppercase tracking-tighter text-4xl italic opacity-20">
                NO PREVIEW
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* View Switcher Overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5">
            <button
                onClick={() => setView('exterior')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${view === 'exterior' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-zinc-500 hover:text-white'}`}
            >
                Экстерьер
            </button>
            <button
                onClick={() => setView('interior')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${view === 'interior' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-zinc-500 hover:text-white'}`}
            >
                Интерьер
            </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div
            onClick={() => setView('exterior')}
            className={`relative aspect-video rounded-3xl overflow-hidden border-2 transition-all cursor-pointer group ${view === 'exterior' ? 'border-primary shadow-xl' : 'border-zinc-900 grayscale opacity-40 hover:opacity-100 hover:grayscale-0'}`}
        >
             <ImageOptimized
                src={exteriorImage || '/placeholder-car.jpg'}
                alt="Exterior Thumbnail"
                fill
                imgClassName="object-cover group-hover:scale-110 transition-transform duration-700"
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-white border border-white/5 shadow-2xl">Экстерьер</span>
              </div>
        </div>
        <div
            onClick={() => setView('interior')}
            className={`relative aspect-video rounded-3xl overflow-hidden border-2 transition-all cursor-pointer group ${view === 'interior' ? 'border-primary shadow-xl' : 'border-zinc-900 grayscale opacity-40 hover:opacity-100 hover:grayscale-0'}`}
        >
             {interiorImage ? (
                <ImageOptimized
                    src={interiorImage}
                    alt="Interior Thumbnail"
                    fill
                    imgClassName="object-cover group-hover:scale-110 transition-transform duration-700"
                    className="w-full h-full"
                />
             ) : (
                <div className="w-full h-full bg-zinc-950 flex items-center justify-center text-[10px] text-zinc-700 font-black uppercase tracking-[0.3em]">
                    Нет фото салона
                </div>
             )}
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-white border border-white/5 shadow-2xl">Интерьер</span>
              </div>
        </div>
      </div>
    </div>
  );
}
