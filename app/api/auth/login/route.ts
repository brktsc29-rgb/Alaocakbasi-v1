import { NextRequest, NextResponse } from 'next/server';
import { checkPassword, createToken, COOKIE_NAME, COOKIE_MAX_AGE } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!checkPassword(password)) {
    return NextResponse.json({ error: 'Hatalı şifre.' }, { status: 401 });
  }

  const token = createToken();
  const res = NextResponse.json({ ok: true });

  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  });

  return res;
}
