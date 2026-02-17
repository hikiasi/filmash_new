import React from 'react';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import TrimEditorClient from './TrimEditorClient';
import { serializePrisma } from '@/lib/utils/serialization';

export default async function TrimEditorPage({ params }: { params: Promise<{ modelId: string, trimId: string }> }) {
  const { modelId, trimId } = await params;

  const trim = await prisma.trim.findUnique({
    where: { id: trimId },
    include: {
      colors: true,
      wheels: true,
      interiors: true,
      steering_wheels: true,
      additional_options: true,
      model: {
        include: { brand: true }
      }
    }
  });

  if (!trim) {
    notFound();
  }

  return <TrimEditorClient trim={serializePrisma(trim)} modelId={modelId} />;
}
