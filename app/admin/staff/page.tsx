import StaffClient from './StaffClient';
import prisma from '@/lib/db';
import { serializePrisma } from '@/lib/utils/serialization';

export default async function StaffPage() {
  const staff = await prisma.staff.findMany({
    orderBy: { created_at: 'desc' }
  });

  return <StaffClient staff={serializePrisma(staff)} />;
}
