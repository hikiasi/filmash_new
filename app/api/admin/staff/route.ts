import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: { created_at: 'desc' }
    });
    return NextResponse.json(staff);
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password || !role) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = await prisma.staff.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json(staff);
  } catch (error) {
    console.error('[STAFF_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
