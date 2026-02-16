import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { inquirySchema } from '@/lib/validations/inquiry';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate
    const validated = inquirySchema.parse(body);

    const inquiry = await prisma.inquiry.create({
      data: {
        trim_id: validated.trimId,
        color_id: validated.colorId,
        wheels_id: validated.wheelsId,
        interior_id: validated.interiorId,
        selected_options: validated.selectedOptions,
        customer_name: validated.name,
        customer_phone: validated.phone,
        customer_email: validated.email,
        total_price_cny: validated.totalPriceCNY,
        total_price_rub: validated.totalPriceRUB,
        status: 'new',
        configuration_snapshot: validated.snapshot,
      },
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error('[INQUIRY_POST]', error);
    if (error instanceof z.ZodError) {
        return new NextResponse(JSON.stringify(error.issues), { status: 400 });
    }
    return new NextResponse('Internal error', { status: 500 });
  }
}
