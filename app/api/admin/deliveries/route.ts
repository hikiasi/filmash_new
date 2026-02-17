import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
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
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(deliveries);
  } catch (error) {
    console.error('[DELIVERIES_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { inquiry_id, car_name, vin, status } = body;

    const delivery = await prisma.delivery.create({
      data: {
        inquiry_id: inquiry_id || null,
        car_name: car_name || 'Unnamed Vehicle',
        vin: vin || '',
        status: status || 'PURCHASED',
      },
    });

    return NextResponse.json(delivery);
  } catch (error) {
    console.error('[DELIVERIES_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
