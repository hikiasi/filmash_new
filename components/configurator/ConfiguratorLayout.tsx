'use client';

import React from 'react';
import { ImageGallery } from './ImageGallery';
import { TrimSelector } from './TrimSelector';
import { ColorSelector } from './ColorSelector';
import { WheelSelector } from './WheelSelector';
import { InteriorSelector } from './InteriorSelector';
import { SteeringWheelSelector } from './SteeringWheelSelector';
import { AdditionalOptions } from './AdditionalOptions';
import { PriceDisplay } from './PriceDisplay';
import { SpecificationsAccordion } from './SpecificationsAccordion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface ConfiguratorLayoutProps {
  model: any;
  onOrderClick: () => void;
}

export function ConfiguratorLayout({ model, onOrderClick }: ConfiguratorLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Left Column: Visualization & Specs */}
      <div className="lg:w-2/3 space-y-12">
        <ImageGallery />
        <SpecificationsAccordion />
      </div>

      {/* Right Column: Controls */}
      <div className="lg:w-1/3 space-y-8">
        <div className="sticky top-8 space-y-8">
          <div className="space-y-2 relative">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-black italic">{model.brand.name}</h2>
            <h1 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none drop-shadow-2xl">
                {model.name.split(' ').map((word: string, i: number) => (
                    <span key={i} className={i === 0 ? "text-white" : "text-zinc-700"}>{word} </span>
                ))}
            </h1>
          </div>

          <PriceDisplay />

          <Button
            onClick={onOrderClick}
            className="w-full h-16 bg-primary hover:bg-primary/90 text-black font-black text-lg rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
          >
            ОСТАВИТЬ ЗАЯВКУ
            <ChevronRight className="size-6" />
          </Button>

          <div className="space-y-10">
            <TrimSelector trims={model.trims} />
            <ColorSelector />
            <WheelSelector />
            <InteriorSelector />
            <SteeringWheelSelector />
            <AdditionalOptions />
          </div>
        </div>
      </div>
    </div>
  );
}
