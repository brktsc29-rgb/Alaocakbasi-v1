import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

const LOCALES = ['tr', 'en', 'de', 'ar', 'ru', 'fr'] as const;

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY ayarlanmamış.' }, { status: 503 });
  }

  try {
    const { text } = (await req.json()) as { text: string };
    if (!text?.trim()) {
      return NextResponse.json({ error: 'Metin boş.' }, { status: 400 });
    }

    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are a professional restaurant menu translator. Translate this menu item description into 6 languages. The input is in Turkish.

Text: "${text.replace(/"/g, '\\"')}"

Return ONLY a JSON object with these exact keys (no explanation, no markdown):
{"tr":"...","en":"...","de":"...","ar":"...","ru":"...","fr":"..."}

Keep each translation concise and suitable for a luxury restaurant menu. Preserve the original Turkish as "tr".`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type');

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const translations = JSON.parse(jsonMatch[0]) as Record<string, string>;

    // Ensure all locales are present, fall back to original text
    const result: Record<string, string> = {};
    for (const locale of LOCALES) {
      result[locale] = translations[locale] ?? text;
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('POST /api/admin/translate error:', err);
    return NextResponse.json({ error: 'Çeviri sırasında hata oluştu.' }, { status: 500 });
  }
}
