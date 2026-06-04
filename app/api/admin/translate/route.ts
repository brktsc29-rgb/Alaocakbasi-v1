import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

const TARGET_LOCALES = ['en', 'de', 'ar', 'ru', 'fr'] as const;

async function translateTo(text: string, target: string): Promise<string> {
  const url =
    `https://api.mymemory.translated.net/get` +
    `?q=${encodeURIComponent(text)}&langpair=tr|${target}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  const data = (await res.json()) as { responseData?: { translatedText?: string } };
  const translated = data.responseData?.translatedText;
  // MyMemory returns the original text on failure/quota
  return translated && translated !== text ? translated : text;
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }

  try {
    const { text } = (await req.json()) as { text: string };
    if (!text?.trim()) {
      return NextResponse.json({ error: 'Metin boş.' }, { status: 400 });
    }

    const results = await Promise.allSettled(
      TARGET_LOCALES.map(async (locale) => ({
        locale,
        value: await translateTo(text, locale),
      }))
    );

    const translations: Record<string, string> = { tr: text };
    for (const r of results) {
      if (r.status === 'fulfilled') {
        translations[r.value.locale] = r.value.value;
      }
    }

    return NextResponse.json(translations);
  } catch (err) {
    console.error('POST /api/admin/translate error:', err);
    return NextResponse.json({ error: 'Çeviri sırasında hata oluştu.' }, { status: 500 });
  }
}
