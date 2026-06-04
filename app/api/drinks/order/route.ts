import { NextRequest, NextResponse } from 'next/server';
import { readDrinks, writeDrinks } from '@/lib/drinks';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

function isAdmin(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return !!token && verifyToken(token);
}

export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }
  try {
    const { ids } = (await req.json()) as { ids: string[] };
    if (!Array.isArray(ids)) {
      return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 });
    }
    const items = await readDrinks();
    const itemMap = new Map(items.map((i) => [i.id, i]));
    const reordered = ids.map((id) => itemMap.get(id)).filter((i): i is NonNullable<typeof i> => i !== undefined);
    const idSet = new Set(ids);
    const extras = items.filter((i) => !idSet.has(i.id));
    await writeDrinks([...reordered, ...extras]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('PUT /api/drinks/order error:', err);
    return NextResponse.json({ error: 'Sıralama sırasında hata oluştu.' }, { status: 500 });
  }
}
