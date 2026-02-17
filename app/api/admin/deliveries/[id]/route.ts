import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const delivery = await prisma.delivery.findUnique({
      where: { id },
      include: { inquiry: true }
    });
    return NextResponse.json(delivery);
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const delivery = await prisma.delivery.update({
      where: { id },
      data: {
        status: body.status,
        vin: body.vin,
        current_location: body.current_location,
        documents: body.documents,
        loading_photos: body.loading_photos,
        unloading_photos: body.unloading_photos,
      },
    });

    return NextResponse.json(delivery);
  } catch (error) {
    console.error('[DELIVERY_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.delivery.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
