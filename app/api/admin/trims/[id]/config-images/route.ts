import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: trimId } = await params;
    const body = await request.json();

    const configImage = await prisma.configurationImage.create({
      data: {
        trim_id: trimId,
        type: body.type,
        color_id: body.color_id,
        wheel_id: body.wheel_id,
        interior_id: body.interior_id,
        steering_wheel_id: body.steering_wheel_id,
        image_url: body.image_url,
      },
    });

    return NextResponse.json(configImage);
  } catch (error) {
    console.error('[CONFIG_IMAGE_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
