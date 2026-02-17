import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const configImage = await prisma.configurationImage.update({
      where: { id },
      data: {
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
    console.error('[CONFIG_IMAGE_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.configurationImage.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[CONFIG_IMAGE_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
