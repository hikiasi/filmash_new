import React from 'react';
import prisma from '@/lib/db';
import SettingsClient from './SettingsClient';

export default async function SettingsPage() {
  const latestRate = await prisma.currencyRate.findFirst({
    orderBy: { created_at: 'desc' },
  });

  const currentRate = latestRate ? Number(latestRate.rate_cny_to_rub) : 13.52;

  return <SettingsClient initialRate={currentRate} />;
}
