'use client';

import { useConfiguratorStore } from '@/lib/store/configurator-store';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Image from 'next/image';

export function ColorSelector() {
  const { selectedTrim, selectedColor, setSelectedColor } = useConfiguratorStore();

  if (!selectedTrim) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 italic">Цвет кузова</h3>
        <span className="text-xs font-black text-white uppercase italic tracking-tight">{selectedColor?.name}</span>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {selectedTrim.colors?.map((color: any) => {
          const isSelected = selectedColor?.id === color.id;
          return (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color)}
              className={cn(
                "relative rounded-full border-2 transition-all duration-500 flex items-center justify-center overflow-hidden group",
                isSelected
                    ? "border-primary scale-100 shadow-[0_0_20px_rgba(207,249,2,0.3)] z-10"
                    : "border-zinc-800 scale-100 grayscale hover:grayscale-0"
              )}
              style={{
                width: isSelected ? '67px' : '53px',
                height: isSelected ? '67px' : '53px',
                backgroundColor: color.hex_code
              }}
            >
              {/* If we had color-specific icons we would use them here */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
              {isSelected && (
                <div className="bg-primary/20 backdrop-blur-sm size-full flex items-center justify-center">
                    <Check className="size-6 text-primary" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
