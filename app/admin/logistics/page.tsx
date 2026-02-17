import React from 'react';
import prisma from '@/lib/db';
import LogisticsClient from './LogisticsClient';
import { serializePrisma } from '@/lib/utils/serialization';

export default async function LogisticsPage() {
  const deliveries = await prisma.delivery.findMany({
    include: {
      inquiry: {
        include: {
          trim: {
            include: {
              model: {
                include: { brand: true }
              }
            }
          }
        }
      }
    },
    orderBy: { created_at: 'desc' }
  });

  const inquiriesWithoutDelivery = await prisma.inquiry.findMany({
    where: {
      delivery: null,
      status: { in: ['NEW', 'IN_PROGRESS', 'COMPLETED'] }
    },
    include: {
      trim: {
        include: { model: { include: { brand: true } } }
      }
    }
  });

  return (
    <LogisticsClient
      initialDeliveries={serializePrisma(deliveries)}
      availableInquiries={serializePrisma(inquiriesWithoutDelivery)}
    />
  );
}
