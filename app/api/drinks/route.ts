import { NextRequest, NextResponse } from 'next/server';
import { readDrinks, writeDrinks, generateDrinkId } from '@/lib/drinks';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

function isAdmin(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return !!token && verifyToken(token);
}

export async function GET() {
  try {
    const items = await readDrinks();
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: 'Veriler yüklenemedi.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { type, name, region, note, year, price, featured, grape } = body;
    if (!type || !name || !price) {
      return NextResponse.json({ error: 'Eksik alan.' }, { status: 400 });
    }
    const items = await readDrinks();
    const newItem = {
      id: generateDrinkId(),
      type,
      name: name.trim(),
      region: (region ?? '').trim(),
      note: (note ?? '').trim(),
      year: (year ?? '—').trim() || '—',
      price: price.trim(),
      featured: Boolean(featured),
      ...(grape ? { grape: grape.trim() } : {}),
    };
    items.push(newItem);
    await writeDrinks(items);
    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    console.error('POST /api/drinks error:', err);
    return NextResponse.json({ error: 'Eklenirken hata oluştu.' }, { status: 500 });
  }
}
