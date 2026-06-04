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
    const body = (await req.json()) as { text?: string; fields?: Record<string, string> };
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const locales = ['tr', 'en', 'de', 'ar', 'ru', 'fr'];

    // ── Single text mode (menu descriptions) ────────────────────────────────────
    if (body.text !== undefined) {
      const text = body.text.trim();
      if (!text) return NextResponse.json({ error: 'Metin boş.' }, { status: 400 });

      const message = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `You are a professional restaurant menu translator. Translate this Turkish menu item description into 5 languages for a luxury restaurant.

Turkish text: "${text.replace(/"/g, '\\"')}"

Return ONLY a valid JSON object, no explanation, no markdown:
{"tr":"...","en":"...","de":"...","ar":"...","ru":"...","fr":"..."}

Rules:
- Keep the Turkish original as "tr"
- Keep translations concise and natural for a fine dining menu
- Preserve ingredient names and cooking technique terms accurately`,
        }],
      });

      const content = message.content[0];
      if (content.type !== 'text') throw new Error('Unexpected response type');
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON in response');
      const translations = JSON.parse(jsonMatch[0]) as Record<string, string>;
      const result: Record<string, string> = {};
      for (const locale of locales) result[locale] = translations[locale] ?? text;
      return NextResponse.json(result);
    }

    // ── Multi-field mode (signature dishes) ─────────────────────────────────────
    if (body.fields !== undefined) {
      const fields = body.fields;
      const fieldNames = Object.keys(fields).filter((k) => fields[k]?.trim());
      if (fieldNames.length === 0) return NextResponse.json({ error: 'Alan boş.' }, { status: 400 });

      const fieldList = fieldNames.map((k) => `"${k}": "${fields[k].replace(/"/g, '\\"')}"`).join('\n');

      const message = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2048,
        messages: [{
          role: 'user',
          content: `You are a professional restaurant menu translator. Translate these Turkish fields into 5 languages for a luxury restaurant.

Fields to translate:
${fieldList}

Return ONLY a valid JSON object with each field as a key containing locale translations, no explanation, no markdown:
{
  "fieldName": {"tr":"...","en":"...","de":"...","ar":"...","ru":"...","fr":"..."},
  ...
}

Rules:
- Keep the Turkish original as "tr"
- Translations must be concise and natural for a fine dining menu
- Preserve ingredient names, dish names and cooking technique terms accurately`,
        }],
      });

      const content = message.content[0];
      if (content.type !== 'text') throw new Error('Unexpected response type');
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON in response');
      const parsed = JSON.parse(jsonMatch[0]) as Record<string, Record<string, string>>;

      const result: Record<string, Record<string, string>> = {};
      for (const key of fieldNames) {
        result[key] = {};
        for (const locale of locales) {
          result[key][locale] = parsed[key]?.[locale] ?? fields[key];
        }
      }
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'text veya fields gerekli.' }, { status: 400 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('POST /api/admin/translate error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
