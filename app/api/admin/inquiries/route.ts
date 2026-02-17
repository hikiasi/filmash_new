import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, model, trim } = body;

    if (!name || !phone) {
      return new NextResponse('Name and Phone are required', { status: 400 });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        customer_name: name,
        customer_phone: phone,
        customer_email: email || '',
        total_price_cny: 0,
        total_price_rub: 0,
        status: 'NEW',
        selected_options: [],
        configuration_snapshot: {
          model: model,
          trim: trim,
          options: []
        }
      },
    });

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error('[ADMIN_INQUIRY_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
