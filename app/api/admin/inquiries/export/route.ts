import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      include: {
        trim: {
          include: {
            model: {
              include: { brand: true }
            }
          }
        }
      }
    });

    const headers = ['ID', 'Customer', 'Phone', 'Email', 'Car', 'Price RUB', 'Price CNY', 'Status', 'Date'];
    const rows = inquiries.map(inq => [
      inq.id,
      inq.customer_name,
      inq.customer_phone,
      inq.customer_email,
      inq.trim ? `${inq.trim.model.brand.name} ${inq.trim.model.name} (${inq.trim.name})` : 'Custom Order / Manually Created',
      inq.total_price_rub,
      inq.total_price_cny,
      inq.status,
      inq.created_at.toISOString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=inquiries.csv'
      }
    });
  } catch (error) {
    console.error('[EXPORT_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
