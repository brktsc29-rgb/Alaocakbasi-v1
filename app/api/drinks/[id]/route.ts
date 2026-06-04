import { NextRequest, NextResponse } from 'next/server';
import { readDrinks, writeDrinks } from '@/lib/drinks';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

function isAdmin(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return !!token && verifyToken(token);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const items = await readDrinks();
    const idx = items.findIndex((i) => i.id === params.id);
    if (idx === -1) return NextResponse.json({ error: 'Bulunamadı.' }, { status: 404 });

    items[idx] = {
      ...items[idx],
      type:     body.type     ?? items[idx].type,
      name:     body.name     ?? items[idx].name,
      region:   body.region   ?? items[idx].region,
      note:     body.note     ?? items[idx].note,
      year:     body.year     ?? items[idx].year,
      price:    body.price    ?? items[idx].price,
      featured: body.featured !== undefined ? Boolean(body.featured) : items[idx].featured,
      grape:    body.grape    !== undefined ? body.grape : items[idx].grape,
    };

    await writeDrinks(items);
    return NextResponse.json(items[idx]);
  } catch (err) {
    console.error('PUT /api/drinks/[id] error:', err);
    return NextResponse.json({ error: 'Güncellenirken hata oluştu.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }
  try {
    const items = await readDrinks();
    const filtered = items.filter((i) => i.id !== params.id);
    if (filtered.length === items.length) {
      return NextResponse.json({ error: 'Bulunamadı.' }, { status: 404 });
    }
    await writeDrinks(filtered);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/drinks/[id] error:', err);
    return NextResponse.json({ error: 'Silinirken hata oluştu.' }, { status: 500 });
  }
}
