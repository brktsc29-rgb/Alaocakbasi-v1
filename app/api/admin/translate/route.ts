import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

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
          content: `You are a professional restaurant menu translator. Translate this Turkish menu item description into 5 languages for a luxury restaurant.

Turkish text: "${text.replace(/"/g, '\\"')}"

Return ONLY a valid JSON object, no explanation, no markdown:
{"tr":"...","en":"...","de":"...","ar":"...","ru":"...","fr":"..."}

Rules:
- Keep the Turkish original as "tr"
- Keep translations concise and natural for a fine dining menu
- Preserve ingredient names and cooking technique terms accurately`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type');

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const translations = JSON.parse(jsonMatch[0]) as Record<string, string>;

    // Ensure all locales present, fall back to original
    const locales = ['tr', 'en', 'de', 'ar', 'ru', 'fr'];
    const result: Record<string, string> = {};
    for (const locale of locales) {
      result[locale] = translations[locale] ?? text;
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('POST /api/admin/translate error:', err);
    return NextResponse.json({ error: 'Çeviri sırasında hata oluştu.' }, { status: 500 });
  }
}
