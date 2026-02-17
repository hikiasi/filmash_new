import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: modelId } = await params;
    const body = await request.json();
    const { name, base_price_cny } = body;

    if (!name || !base_price_cny) {
      return new NextResponse('Name and Price are required', { status: 400 });
    }

    const trim = await prisma.trim.create({
      data: {
        model_id: modelId,
        name,
        base_price_cny: parseFloat(base_price_cny),
        base_price_rub: parseFloat(base_price_cny) * 13.5, // Default multiplier
        specifications: {},
      },
    });

    return NextResponse.json(trim);
  } catch (error) {
    console.error('[TRIM_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
