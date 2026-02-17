import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

async function getMultiplier() {
    const latestRate = await prisma.currencyRate.findFirst({
        orderBy: { created_at: 'desc' },
    });
    return latestRate ? Number(latestRate.rate_cny_to_rub) : 13.5;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const multiplier = await getMultiplier();
    const item = await prisma.additionalOption.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        price_cny: body.additional_price_cny,
        price_rub: (body.additional_price_cny || 0) * multiplier,
        is_paid: (body.additional_price_cny || 0) > 0,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.additionalOption.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
