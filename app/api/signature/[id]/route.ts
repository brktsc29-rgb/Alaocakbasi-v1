import { NextRequest, NextResponse } from 'next/server';
import { readSignature, writeSignature } from '@/lib/signature';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

function isAdmin(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return !!token && verifyToken(token);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  try {
    const body = await req.json();
    const items = await readSignature();
    const idx = items.findIndex((i) => i.id === params.id);
    if (idx === -1) return NextResponse.json({ error: 'Bulunamadı.' }, { status: 404 });

    items[idx] = {
      ...items[idx],
      name:         body.name         !== undefined ? body.name.trim()         : items[idx].name,
      price:        body.price        !== undefined ? body.price.trim()        : items[idx].price,
      subtitle:     body.subtitle     !== undefined ? body.subtitle.trim()     : items[idx].subtitle,
      description:  body.description  !== undefined ? body.description.trim()  : items[idx].description,
      tag:          body.tag          !== undefined ? body.tag.trim()          : items[idx].tag,
      image:        body.image        !== undefined ? body.image.trim()        : items[idx].image,
      subtitles:    body.subtitles    !== undefined ? body.subtitles    : items[idx].subtitles,
      descriptions: body.descriptions !== undefined ? body.descriptions : items[idx].descriptions,
      tags:         body.tags         !== undefined ? body.tags         : items[idx].tags,
    };

    await writeSignature(items);
    return NextResponse.json(items[idx]);
  } catch (err) {
    console.error('PUT /api/signature/[id] error:', err);
    return NextResponse.json({ error: 'Güncellenirken hata oluştu.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  try {
    const items = await readSignature();
    const filtered = items.filter((i) => i.id !== params.id);
    if (filtered.length === items.length) return NextResponse.json({ error: 'Bulunamadı.' }, { status: 404 });
    await writeSignature(filtered);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/signature/[id] error:', err);
    return NextResponse.json({ error: 'Silinirken hata oluştu.' }, { status: 500 });
  }
}
