'use client';

import { useConfiguratorStore } from '@/lib/store/configurator-store';
import { cn } from '@/lib/utils';

export function WheelSelector() {
  const { selectedTrim, selectedWheels, setSelectedWheels } = useConfiguratorStore();

  if (!selectedTrim) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Диски</h3>
      <div className="grid grid-cols-1 gap-2">
        {selectedTrim.wheels?.map((wheel: any) => (
          <button
            key={wheel.id}
            onClick={() => setSelectedWheels(wheel)}
            className={cn(
              "flex items-center justify-between px-5 py-4 rounded-2xl border transition-all text-left",
              selectedWheels?.id === wheel.id
                ? "bg-zinc-100 text-black border-white"
                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
            )}
          >
            <div className="flex flex-col">
                <span className="font-bold text-sm">{wheel.name}</span>
                <span className="text-[10px] opacity-70">{wheel.size}</span>
            </div>
            <span className={cn(
              "text-xs",
              selectedWheels?.id === wheel.id ? "text-zinc-600" : "text-zinc-500"
            )}>
              {wheel.additional_price_rub > 0 ? `+${Number(wheel.additional_price_rub).toLocaleString()} ₽` : 'Стандарт'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
