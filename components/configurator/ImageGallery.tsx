'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useConfiguratorStore } from '@/lib/store/configurator-store';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageOptimized from '@/components/shared/ImageOptimized';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ImageGallery() {
  const {
    selectedColor,
    selectedWheels,
    selectedInterior,
    selectedSteeringWheel,
    selectedTrim
  } = useConfiguratorStore();

  const [view, setView] = useState<'exterior' | 'interior'>('exterior');
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Exterior images matching color and wheels
  const exteriorImages = selectedTrim?.config_images?.filter((img: any) =>
    img.type === 'exterior' &&
    img.color_id === selectedColor?.id &&
    (img.wheel_id === selectedWheels?.id || !img.wheel_id)
  ).sort((a: any, b: any) => {
      // Sort to ensure consistent order (e.g. front view first)
      if (a.wheel_id && !b.wheel_id) return -1;
      if (!a.wheel_id && b.wheel_id) return 1;
      return 0;
  }) || [];

  // Interior images matching interior and steering wheel
  const interiorImages = selectedTrim?.config_images?.filter((img: any) =>
    img.type === 'interior' &&
    img.interior_id === selectedInterior?.id &&
    (img.steering_wheel_id === selectedSteeringWheel?.id || !img.steering_wheel_id)
  ) || [];

  const currentImages = view === 'exterior' ? exteriorImages : interiorImages;

  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(0);
  }, [view, selectedColor, selectedWheels, selectedInterior, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="space-y-6">
      <div className="relative aspect-[16/10] bg-zinc-100 rounded-[2.5rem] overflow-hidden border border-zinc-200 shadow-2xl group/gallery">
        {/* Background glow / shadow for depth */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />

        <div className="h-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {currentImages.length > 0 ? (
              currentImages.map((img: any, idx: number) => (
                <div key={`${img.id}-${idx}`} className="flex-[0_0_100%] min-w-0 relative">
                  <ImageOptimized
                    src={img.image_url}
                    alt={`Car ${view} view ${idx + 1}`}
                    fill
                    imgClassName="object-contain scale-90"
                    className="w-full h-full"
                    priority={idx === 0}
                  />
                </div>
              ))
            ) : (
              <div className="flex-[0_0_100%] min-w-0 flex items-center justify-center">
                <div className="text-zinc-300 font-black uppercase tracking-tighter text-4xl italic opacity-50">
                  НЕТ ПРЕВЬЮ
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        {currentImages.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 size-12 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 flex items-center justify-center text-zinc-900 shadow-xl opacity-0 group-hover/gallery:opacity-100 transition-all hover:bg-white"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 size-12 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 flex items-center justify-center text-zinc-900 shadow-xl opacity-0 group-hover/gallery:opacity-100 transition-all hover:bg-white"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {currentImages.length > 1 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5 p-2 bg-black/5 backdrop-blur-sm rounded-full">
            {currentImages.map((_, i) => (
              <div
                key={i}
                className={`size-1.5 rounded-full transition-all ${i === selectedIndex ? 'w-4 bg-primary' : 'bg-zinc-400'}`}
              />
            ))}
          </div>
        )}

        {/* View Switcher Overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-xl p-1.5 rounded-2xl border border-zinc-200 shadow-2xl">
            <button
                onClick={() => setView('exterior')}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${view === 'exterior' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
                <span className="material-symbols-outlined text-sm">directions_car</span>
                Экстерьер
            </button>
            <button
                onClick={() => setView('interior')}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${view === 'interior' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
                <span className="material-symbols-outlined text-sm">event_seat</span>
                Интерьер
            </button>
        </div>
      </div>

      {/* Thumbnails / Comparison views */}
      <div className="grid grid-cols-2 gap-6">
        <div
            onClick={() => setView('exterior')}
            className={`relative aspect-video rounded-[2rem] overflow-hidden border-4 transition-all cursor-pointer group ${view === 'exterior' ? 'border-primary shadow-2xl scale-[1.02]' : 'border-zinc-100 grayscale opacity-40 hover:opacity-100 hover:grayscale-0'}`}
        >
             <ImageOptimized
                src={exteriorImages[0]?.image_url || '/placeholder-car.jpg'}
                alt="Exterior Thumbnail"
                fill
                imgClassName="object-cover group-hover:scale-110 transition-transform duration-700"
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-xl text-black border border-zinc-200 shadow-2xl">Экстерьер</span>
              </div>
        </div>
        <div
            onClick={() => setView('interior')}
            className={`relative aspect-video rounded-[2rem] overflow-hidden border-4 transition-all cursor-pointer group ${view === 'interior' ? 'border-primary shadow-2xl scale-[1.02]' : 'border-zinc-100 grayscale opacity-40 hover:opacity-100 hover:grayscale-0'}`}
        >
             {interiorImages.length > 0 ? (
                <ImageOptimized
                    src={interiorImages[0]?.image_url}
                    alt="Interior Thumbnail"
                    fill
                    imgClassName="object-cover group-hover:scale-110 transition-transform duration-700"
                    className="w-full h-full"
                />
             ) : (
                <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-[10px] text-zinc-400 font-black uppercase tracking-[0.3em]">
                    Нет фото салона
                </div>
             )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-xl text-black border border-zinc-200 shadow-2xl">Интерьер</span>
              </div>
        </div>
      </div>
    </div>
  );
}
