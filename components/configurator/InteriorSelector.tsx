'use client';

import { useConfiguratorStore } from '@/lib/store/configurator-store';
import { cn } from '@/lib/utils';

export function InteriorSelector() {
  const { selectedTrim, selectedInterior, setSelectedInterior } = useConfiguratorStore();

  if (!selectedTrim) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Интерьер</h3>
      <div className="grid grid-cols-1 gap-2">
        {selectedTrim.interiors?.map((interior: any) => (
          <button
            key={interior.id}
            onClick={() => setSelectedInterior(interior)}
            className={cn(
              "flex items-center justify-between px-5 py-4 rounded-2xl border transition-all text-left",
              selectedInterior?.id === interior.id
                ? "bg-zinc-100 text-black border-white"
                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
            )}
          >
             <div className="flex flex-col">
                <span className="font-bold text-sm">{interior.name}</span>
                <span className="text-[10px] opacity-70">{interior.material}</span>
            </div>
            <span className={cn(
              "text-xs",
              selectedInterior?.id === interior.id ? "text-zinc-600" : "text-zinc-500"
            )}>
              {interior.additional_price_rub > 0 ? `+${Number(interior.additional_price_rub).toLocaleString()} ₽` : 'Стандарт'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
