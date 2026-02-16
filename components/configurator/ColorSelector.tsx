'use client';

import { useConfiguratorStore } from '@/lib/store/configurator-store';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export function ColorSelector() {
  const { selectedTrim, selectedColor, setSelectedColor } = useConfiguratorStore();

  if (!selectedTrim) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Цвет кузова</h3>
        <span className="text-xs text-zinc-400">{selectedColor?.name}</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {selectedTrim.colors?.map((color: any) => (
          <button
            key={color.id}
            onClick={() => setSelectedColor(color)}
            className={cn(
              "relative size-10 rounded-full border-2 transition-all flex items-center justify-center",
              selectedColor?.id === color.id ? "border-white scale-110 shadow-lg" : "border-transparent"
            )}
            style={{ backgroundColor: color.hex_code }}
          >
            {selectedColor?.id === color.id && (
                <Check className="size-5 text-white mix-blend-difference" />
            )}
            {color.additional_price_rub > 0 && (
                <span className="absolute -top-1 -right-1 size-3 bg-primary rounded-full border border-black" title="Платная опция" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
