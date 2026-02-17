import React from 'react';
import prisma from '@/lib/db';
import AddVehicleClient from './AddVehicleClient';

export default async function AddVehiclePage() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: 'asc' }
  });

  return <AddVehicleClient brands={brands} />;
}
