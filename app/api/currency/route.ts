import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    // Check if we have a recent rate in DB (within last hour)
    const lastRate = await prisma.currencyRate.findFirst({
        orderBy: { created_at: 'desc' }
    });

    const oneHourAgo = new Date(Date.now() - 3600000);

    if (lastRate && lastRate.created_at > oneHourAgo) {
        return NextResponse.json({ rate: Number(lastRate.rate_cny_to_rub), date: lastRate.created_at });
    }

    // Otherwise fetch from CBR
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js', {
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch from CBR');
    }

    const data = await response.json();
    const cnyRate = data.Valute.CNY.Value / data.Valute.CNY.Nominal;

    const savedRate = await prisma.currencyRate.create({
        data: {
            rate_cny_to_rub: cnyRate,
            source: 'cbr',
            is_manual_override: false,
            valid_from: new Date(),
        }
    });

    return NextResponse.json({ rate: cnyRate, date: savedRate.created_at });
  } catch (error) {
    console.error('[CURRENCY_GET]', error);

    const lastRate = await prisma.currencyRate.findFirst({
        orderBy: { created_at: 'desc' }
    });

    if (lastRate) {
        return NextResponse.json({ rate: Number(lastRate.rate_cny_to_rub), date: lastRate.created_at });
    }

    return NextResponse.json({ rate: 13.5, date: new Date() }, { status: 200 });
  }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { rate } = body;

        if (!rate || isNaN(rate)) {
            return new NextResponse('Invalid rate', { status: 400 });
        }

        const savedRate = await prisma.currencyRate.create({
            data: {
                rate_cny_to_rub: rate,
                source: 'manual',
                is_manual_override: true,
                valid_from: new Date(),
            }
        });

        return NextResponse.json({ rate: Number(savedRate.rate_cny_to_rub), date: savedRate.created_at });
    } catch (error) {
        console.error('[CURRENCY_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
