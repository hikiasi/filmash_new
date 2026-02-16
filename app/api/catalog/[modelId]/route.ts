import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ modelId: string }> }
) {
  try {
    const { modelId } = await params;

    const model = await prisma.model.findUnique({
      where: { id: modelId },
      include: {
        brand: true,
        trims: {
          orderBy: {
            base_price_rub: 'asc',
          },
          include: {
            colors: true,
            wheels: true,
            interiors: true,
            additional_options: true,
          }
        },
      },
    });

    if (!model) {
      return new NextResponse('Model not found', { status: 404 });
    }

    return NextResponse.json(model, { status: 200 });
  } catch (error) {
    console.error('[MODEL_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
