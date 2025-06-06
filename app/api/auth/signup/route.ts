import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (email && password) {
    return NextResponse.json({ email, token: 'mock-token' });
  }
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}