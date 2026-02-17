import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

async function getMultiplier() {
    const latestRate = await prisma.currencyRate.findFirst({
        orderBy: { created_at: 'desc' },
    });
    return latestRate ? Number(latestRate.rate_cny_to_rub) : 13.5;
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: trimId } = await params;
    const body = await request.json();
    const multiplier = await getMultiplier();
    const item = await prisma.steeringWheel.create({
      data: {
        trim_id: trimId,
        name: body.name,
        image_url: body.image_url || '',
        additional_price_cny: body.additional_price_cny || 0,
        additional_price_rub: (body.additional_price_cny || 0) * multiplier,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
