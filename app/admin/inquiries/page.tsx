import React from 'react';
import prisma from '@/lib/db';
import InquiriesClient from './InquiriesClient';
import { serializePrisma } from '@/lib/utils/serialization';

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { created_at: 'desc' },
    include: {
      trim: {
        include: {
          model: true
        }
      }
    }
  });

  return <InquiriesClient inquiries={serializePrisma(inquiries)} />;
}
