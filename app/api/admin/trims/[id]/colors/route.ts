import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

async function getMultiplier() {
    const latestRate = await prisma.currencyRate.findFirst({
        orderBy: { created_at: 'desc' },
    });
    return latestRate ? Number(latestRate.rate_cny_to_rub) : 13.5;
}

// COLORS POST
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: trimId } = await params;
    const body = await request.json();
    const multiplier = await getMultiplier();
    const color = await prisma.color.create({
      data: {
        trim_id: trimId,
        name: body.name,
        hex_code: body.hex_code || '#000000',
        image_url: body.image_url || '',
        is_premium: !!body.is_premium,
        additional_price_cny: body.additional_price_cny || 0,
        additional_price_rub: (body.additional_price_cny || 0) * multiplier,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
