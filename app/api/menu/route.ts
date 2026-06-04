import { NextRequest, NextResponse } from 'next/server';
import { readMenu, writeMenu, generateId } from '@/lib/menu';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

function isAdmin(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return !!token && verifyToken(token);
}

export async function GET() {
  try {
    const items = await readMenu();
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: 'Menü yüklenemedi.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { category, name, description, price, special } = body;

    if (!category || !name || !price) {
      return NextResponse.json({ error: 'Eksik alan.' }, { status: 400 });
    }

    const items = await readMenu();
    const newItem = {
      id: generateId(),
      category,
      name: name.trim(),
      description: (description ?? '').trim(),
      ...(body.descriptions ? { descriptions: body.descriptions } : {}),
      price: price.trim(),
      special: Boolean(special),
    };

    items.push(newItem);
    await writeMenu(items);

    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    console.error('POST /api/menu error:', err);
    return NextResponse.json({ error: 'Ürün eklenirken hata oluştu.' }, { status: 500 });
  }
}
