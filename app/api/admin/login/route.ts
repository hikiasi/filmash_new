import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const staff = await prisma.staff.findUnique({
      where: { email }
    });

    if (!staff) {
      return new NextResponse('Invalid credentials', { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, staff.password);

    if (!isPasswordValid) {
      return new NextResponse('Invalid credentials', { status: 401 });
    }

    // Update last login
    await prisma.staff.update({
      where: { id: staff.id },
      data: { last_login: new Date() }
    });

    const response = NextResponse.json({ success: true, role: staff.role });
    response.cookies.set('filmash-auth', 'true', {
      path: '/',
      maxAge: 86400,
      httpOnly: false, // For now, client-side check exists
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('[LOGIN_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
