'use server';

import { cookies } from 'next/headers';

export async function authenticate(_: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: email, contrasena: password }),
      cache: 'no-store'
    });

    const data = await res.json();

    if (!res.ok || !data.token) {
      return { error: data.message || 'Credenciales inválidas' };
    }

    return { success: true,token: data.token, user: data.user };
  } catch (err) {
    console.error('Error en login:', err);
    return { error: 'Error interno del servidor' };
  }
}