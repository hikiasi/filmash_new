'use client';

import { useConfiguratorStore } from '@/lib/store/configurator-store';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function WheelSelector() {
  const { selectedTrim, selectedWheels, setSelectedWheels } = useConfiguratorStore();

  if (!selectedTrim) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 italic">Колеса</h3>
        <span className="text-xs font-black text-white uppercase italic tracking-tight">{selectedWheels?.name}</span>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {selectedTrim.wheels?.map((wheel: any) => {
          const isSelected = selectedWheels?.id === wheel.id;
          return (
            <button
              key={wheel.id}
              onClick={() => setSelectedWheels(wheel)}
              className={cn(
                "relative rounded-2xl border-2 transition-all duration-500 flex items-center justify-center overflow-hidden bg-zinc-900",
                isSelected
                    ? "border-primary shadow-[0_0_20px_rgba(207,249,2,0.3)] z-10"
                    : "border-zinc-800 opacity-80 hover:opacity-100"
              )}
              style={{
                width: isSelected ? '67px' : '53px',
                height: isSelected ? '67px' : '53px',
              }}
            >
              {wheel.image_url ? (
                  <Image src={wheel.image_url} alt={wheel.name} fill className="object-cover" />
              ) : (
                  <span className="material-symbols-outlined text-zinc-700">tire_repair</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
