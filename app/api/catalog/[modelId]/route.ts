import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { modelId: string } }
) {
  try {
    const { modelId } = params;

    if (!modelId) {
      return new NextResponse('Model ID is required', { status: 400 });
    }

    const model = await prisma.model.findUnique({
      where: {
        id: modelId,
      },
      include: {
        brand: true,
        trims: {
          include: {
            colors: true,
            wheels: true,
            interiors: true,
            additional_options: true,
          },
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
