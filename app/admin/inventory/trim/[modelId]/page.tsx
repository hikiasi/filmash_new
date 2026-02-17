import React from 'react';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import ModelEditorClient from './ModelEditorClient';
import { serializePrisma } from '@/lib/utils/serialization';

export default async function ModelEditorPage({ params }: { params: Promise<{ modelId: string }> }) {
  const { modelId } = await params;

  const model = await prisma.model.findUnique({
    where: { id: modelId },
    include: {
      brand: true,
      trims: {
        orderBy: { base_price_cny: 'asc' },
        include: {
            colors: true,
            wheels: true,
            interiors: true,
            steering_wheels: true,
            additional_options: true,
        }
      },
    }
  });

  if (!model) {
    notFound();
  }

  return <ModelEditorClient model={serializePrisma(model)} />;
}
