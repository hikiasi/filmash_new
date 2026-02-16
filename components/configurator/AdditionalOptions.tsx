'use client';

import { useConfiguratorStore } from '@/lib/store/configurator-store';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function AdditionalOptions() {
  const { selectedTrim, selectedOptions, toggleOption } = useConfiguratorStore();

  if (!selectedTrim || !selectedTrim.additional_options?.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Дополнительные опции</h3>
      <div className="space-y-3">
        {selectedTrim.additional_options.map((option: any) => (
          <div key={option.id} className="flex items-start space-x-3 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <Checkbox
              id={`option-${option.id}`}
              checked={selectedOptions.some(o => o.id === option.id)}
              onCheckedChange={() => toggleOption(option)}
              className="mt-1 border-zinc-700 data-[state=checked]:bg-primary"
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor={`option-${option.id}`}
                className="text-sm font-bold text-white cursor-pointer leading-tight"
              >
                {option.name}
              </Label>
              <p className="text-xs text-zinc-500">{option.description}</p>
              {option.price_rub > 0 && (
                <p className="text-xs text-primary font-bold">+{Number(option.price_rub).toLocaleString()} ₽</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
