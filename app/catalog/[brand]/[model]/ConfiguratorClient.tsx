'use client';

import { useEffect, useState } from 'react';
import { ConfiguratorLayout } from '@/components/configurator/ConfiguratorLayout';
import { useConfiguratorStore } from '@/lib/store/configurator-store';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { InquiryForm } from '@/components/configurator/InquiryForm';

interface ConfiguratorClientProps {
  model: any;
}

export default function ConfiguratorClient({ model }: ConfiguratorClientProps) {
  const { setSelectedTrim, resetConfig } = useConfiguratorStore();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    // Reset and initialize with the first (cheapest) trim
    resetConfig();
    if (model.trims?.length > 0) {
      setSelectedTrim(model.trims[0]);
    }
  }, [model, setSelectedTrim, resetConfig]);

  return (
    <>
      <ConfiguratorLayout
        model={model}
        onOrderClick={() => setIsOrderModalOpen(true)}
      />

      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-900 max-w-lg p-0 overflow-hidden rounded-3xl">
          <InquiryForm onComplete={() => setIsOrderModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
