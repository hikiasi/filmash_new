import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rate } = body;

    if (!rate) {
      return new NextResponse('Rate is required', { status: 400 });
    }

    const currencyRate = await prisma.currencyRate.create({
      data: {
        rate_cny_to_rub: rate,
        source: 'MANUAL',
        is_manual_override: true,
        valid_from: new Date(),
      },
    });

    return NextResponse.json(currencyRate);
  } catch (error) {
    console.error('[CURRENCY_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
