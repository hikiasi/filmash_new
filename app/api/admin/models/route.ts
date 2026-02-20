import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { brand_id, name, body_type, year, image_url, description } = body;

    if (!brand_id || !name) {
      return new NextResponse('Brand and Name are required', { status: 400 });
    }

    const model = await prisma.model.create({
      data: {
        brand_id,
        name,
        body_type,
        year: parseInt(year),
        image_url,
        description: description || '',
      },
    });

    return NextResponse.json(model);
  } catch (error) {
    console.error('[MODEL_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
