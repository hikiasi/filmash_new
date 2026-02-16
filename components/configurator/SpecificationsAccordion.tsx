'use client';

import { useConfiguratorStore } from '@/lib/store/configurator-store';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Info } from 'lucide-react';

export function SpecificationsAccordion() {
  const { selectedTrim } = useConfiguratorStore();

  if (!selectedTrim || !selectedTrim.specifications) return null;

  const specs = selectedTrim.specifications;

  return (
    <div className="p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
        <Info className="text-zinc-500" />
        Технические характеристики
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="flex justify-between py-3 border-b border-zinc-800">
            <span className="text-zinc-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            <span className="font-medium text-white">{String(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
