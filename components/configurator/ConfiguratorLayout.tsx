'use client';

import React from 'react';
import { ImageGallery } from './ImageGallery';
import { TrimSelector } from './TrimSelector';
import { ColorSelector } from './ColorSelector';
import { WheelSelector } from './WheelSelector';
import { InteriorSelector } from './InteriorSelector';
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
          <div className="space-y-2">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold">{model.brand.name}</h2>
            <h1 className="text-5xl font-black text-white">{model.name}</h1>
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
            <AdditionalOptions />
          </div>
        </div>
      </div>
    </div>
  );
}
