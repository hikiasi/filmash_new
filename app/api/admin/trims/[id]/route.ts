import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, base_price_cny, specifications } = body;

    const latestRate = await prisma.currencyRate.findFirst({
      orderBy: { created_at: 'desc' },
    });
    const multiplier = latestRate ? Number(latestRate.rate_cny_to_rub) : 13.5;

    const trim = await prisma.trim.update({
      where: { id },
      data: {
        name,
        base_price_cny: base_price_cny ? parseFloat(base_price_cny) : undefined,
        base_price_rub: base_price_cny ? parseFloat(base_price_cny) * multiplier : undefined,
        specifications: specifications || undefined,
      },
    });

    return NextResponse.json(trim);
  } catch (error) {
    console.error('[TRIM_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
