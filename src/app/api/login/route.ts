import { NextResponse } from 'next/server';
import { authenticate } from '@/app/api/auth/authentication';

export async function POST(request: Request) {
  const formData = await request.formData();
  const result = await authenticate(null, formData);

  if (typeof result === 'string') {
    return NextResponse.json({ error: result }, { status: 401 });
  }

  // Crear la respuesta primero
  const response = NextResponse.json(
    { success: true, user: result.user },
    { status: 200 }
  );

  // Luego configurar las cookies en la respuesta
  response.cookies.set('token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60, // 1 hora
    path: '/',
  });
  return response;
}