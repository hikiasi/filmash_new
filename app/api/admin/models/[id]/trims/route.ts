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

    // Find first existing trim to inherit visual options from
    const baseTrim = await prisma.trim.findFirst({
      where: { model_id: modelId },
      include: {
        colors: true,
        wheels: true,
        interiors: true,
        steering_wheels: true,
        additional_options: true,
      }
    });

    const latestRate = await prisma.currencyRate.findFirst({
      orderBy: { created_at: 'desc' },
    });
    const multiplier = latestRate ? Number(latestRate.rate_cny_to_rub) : 13.5;

    const trim = await prisma.trim.create({
      data: {
        model_id: modelId,
        name,
        base_price_cny: parseFloat(base_price_cny),
        base_price_rub: parseFloat(base_price_cny) * multiplier,
        specifications: baseTrim?.specifications || {},
      },
    });

    if (baseTrim) {
      // Inherit visual options
      if (baseTrim.colors.length) {
        await prisma.color.createMany({
          data: baseTrim.colors.map(c => ({
            trim_id: trim.id,
            name: c.name,
            hex_code: c.hex_code,
            image_url: c.image_url,
            is_premium: c.is_premium,
            additional_price_cny: c.additional_price_cny,
            additional_price_rub: c.additional_price_rub,
          }))
        });
      }
      if (baseTrim.wheels.length) {
        await prisma.wheel.createMany({
          data: baseTrim.wheels.map(w => ({
            trim_id: trim.id,
            name: w.name,
            size: w.size,
            image_url: w.image_url,
            additional_price_cny: w.additional_price_cny,
            additional_price_rub: w.additional_price_rub,
          }))
        });
      }
      if (baseTrim.interiors.length) {
        await prisma.interior.createMany({
          data: baseTrim.interiors.map(i => ({
            trim_id: trim.id,
            name: i.name,
            material: i.material,
            image_url: i.image_url,
            additional_price_cny: i.additional_price_cny,
            additional_price_rub: i.additional_price_rub,
          }))
        });
      }
    }

    return NextResponse.json(trim);
  } catch (error) {
    console.error('[TRIM_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
