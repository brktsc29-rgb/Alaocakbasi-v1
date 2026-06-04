import { NextRequest, NextResponse } from 'next/server';
import { readSignature, writeSignature, generateSignatureId, MAX_DISHES } from '@/lib/signature';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

function isAdmin(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return !!token && verifyToken(token);
}

export async function GET() {
  try {
    return NextResponse.json(await readSignature());
  } catch {
    return NextResponse.json({ error: 'Yüklenemedi.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  try {
    const body = await req.json();
    const { name, price, subtitle, description, tag, image } = body;
    if (!name || !price) return NextResponse.json({ error: 'Eksik alan.' }, { status: 400 });

    const items = await readSignature();
    if (items.length >= MAX_DISHES) {
      return NextResponse.json({ error: `Maksimum ${MAX_DISHES} yemek eklenebilir.` }, { status: 400 });
    }

    const newItem = {
      id: generateSignatureId(),
      name: name.trim(),
      price: price.trim(),
      subtitle: (subtitle ?? '').trim(),
      description: (description ?? '').trim(),
      tag: (tag ?? '').trim(),
      image: (image ?? '').trim(),
      ...(body.subtitles    ? { subtitles: body.subtitles }       : {}),
      ...(body.descriptions ? { descriptions: body.descriptions } : {}),
      ...(body.tags         ? { tags: body.tags }                 : {}),
    };

    items.push(newItem);
    await writeSignature(items);
    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    console.error('POST /api/signature error:', err);
    return NextResponse.json({ error: 'Eklenirken hata oluştu.' }, { status: 500 });
  }
}
