import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ trimId: string }> }
) {
  try {
    const { trimId } = await params;

    const trim = await prisma.trim.findUnique({
      where: { id: trimId },
      include: {
        colors: true,
        wheels: true,
        interiors: true,
        additional_options: true,
        model: {
          include: {
            brand: true,
          }
        }
      },
    });

    if (!trim) {
      return new NextResponse('Trim not found', { status: 404 });
    }

    return NextResponse.json(trim, { status: 200 });
  } catch (error) {
    console.error('[CONFIGURATOR_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
