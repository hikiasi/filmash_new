'use client';

import { useConfiguratorStore } from '@/lib/store/configurator-store';
import { Info } from 'lucide-react';

const SPEC_LABELS: Record<string, string> = {
  brand: 'Бренд',
  power: 'Мощность л/с',
  battery: 'Емкость батареи',
  length: 'Длина, мм',
  width: 'Ширина, мм',
  height: 'Высота, мм',
  wheelbase: 'Колесная база, мм',
  seats: 'Число мест для сиденья',
  engine_type: 'Тип двигателя',
  range: 'Запас хода',
  acceleration: 'Разгон 0-100км/ч',
  top_speed: 'Максимальная скорость, км/ч',
  total_power: 'Общая мощность двух электромоторов',
  drive: 'Привод',
};

export function SpecificationsAccordion() {
  const { selectedTrim } = useConfiguratorStore();

  if (!selectedTrim || !selectedTrim.specifications) return null;

  const specs = selectedTrim.specifications as Record<string, any>;

  return (
    <div className="p-10 bg-zinc-950 rounded-[2.5rem] border border-zinc-900 shadow-2xl relative">
      <h3 className="text-xl font-black mb-10 flex items-center gap-4 text-white uppercase italic tracking-tighter">
        <span className="size-10 rounded-xl bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800">
            <span className="material-symbols-outlined">info</span>
        </span>
        Технические характеристики
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
        {Object.entries(SPEC_LABELS).map(([key, label]) => {
          const value = specs[key];
          if (value === undefined) return null;

          return (
            <div key={key} className="flex justify-between items-center py-4 border-b border-zinc-900 group hover:border-zinc-800 transition-colors">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
              <span className="font-black text-white uppercase italic tracking-tight">{String(value)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
