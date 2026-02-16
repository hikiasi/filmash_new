'use client';

import { useConfiguratorStore } from '@/lib/store/configurator-store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Trim {
  id: string;
  name: string;
  base_price_rub: number;
}

interface TrimSelectorProps {
  trims: Trim[];
}

export function TrimSelector({ trims }: TrimSelectorProps) {
  const { selectedTrim, setSelectedTrim } = useConfiguratorStore();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 italic">Модель</h3>
      <div className="grid grid-cols-1 gap-2">
        {trims.map((trim) => (
          <button
            key={trim.id}
            onClick={() => setSelectedTrim(trim as any)}
            className={cn(
              "flex items-center justify-between px-6 py-4 rounded-2xl border transition-all text-left",
              selectedTrim?.id === trim.id
                ? "bg-white text-black border-white shadow-lg"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
            )}
          >
            <span className="font-bold">{trim.name}</span>
            <span className={cn(
              "text-xs",
              selectedTrim?.id === trim.id ? "text-zinc-600" : "text-zinc-500"
            )}>
               от {Number(trim.base_price_rub).toLocaleString()} ₽
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
