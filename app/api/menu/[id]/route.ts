import { NextRequest, NextResponse } from 'next/server';
import { readMenu, writeMenu } from '@/lib/menu';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

function isAdmin(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return !!token && verifyToken(token);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const items = await readMenu();
    const idx = items.findIndex((i) => i.id === params.id);

    if (idx === -1) {
      return NextResponse.json({ error: 'Bulunamadı.' }, { status: 404 });
    }

    items[idx] = {
      ...items[idx],
      category: body.category ?? items[idx].category,
      name: (body.name ?? items[idx].name).trim(),
      description: (body.description ?? items[idx].description).trim(),
      descriptions: body.descriptions !== undefined ? body.descriptions : items[idx].descriptions,
      price: (body.price ?? items[idx].price).trim(),
      special: body.special !== undefined ? Boolean(body.special) : items[idx].special,
    };

    await writeMenu(items);
    return NextResponse.json(items[idx]);
  } catch (err) {
    console.error('PUT /api/menu/[id] error:', err);
    return NextResponse.json({ error: 'Güncelleme sırasında hata oluştu.' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }

  try {
    const items = await readMenu();
    const filtered = items.filter((i) => i.id !== params.id);

    if (filtered.length === items.length) {
      return NextResponse.json({ error: 'Bulunamadı.' }, { status: 404 });
    }

    await writeMenu(filtered);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/menu/[id] error:', err);
    return NextResponse.json({ error: 'Silme sırasında hata oluştu.' }, { status: 500 });
  }
}
