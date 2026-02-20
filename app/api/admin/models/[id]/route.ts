import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, body_type, year, description, image_url } = body;

    const model = await prisma.model.update({
      where: { id },
      data: {
        name,
        body_type,
        year: parseInt(year),
        image_url,
        description,
      },
    });

    return NextResponse.json(model);
  } catch (error) {
    console.error('[MODEL_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
