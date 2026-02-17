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
        description: description || '',
      },
    });

    // If there's an image URL, we might want to create a default trim with this image or store it somewhere.
    // For now, models don't have an image_url in the schema, it's in the Trims/Colors.
    // Actually, I should probably add image_url to Model if it's needed for the catalog list.
    // Let's check the schema again.

    return NextResponse.json(model);
  } catch (error) {
    console.error('[MODEL_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
