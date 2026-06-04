import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }

  const result: Record<string, unknown> = {
    vercel: !!process.env.VERCEL,
    node_env: process.env.NODE_ENV,
    upstash_url_set: !!process.env.UPSTASH_REDIS_REST_URL,
    upstash_token_set: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    upstash_url_prefix: process.env.UPSTASH_REDIS_REST_URL?.slice(0, 30) ?? null,
    redis_test: null as string | null,
    redis_error: null as string | null,
  };

  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const { Redis } = await import('@upstash/redis');
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      await redis.set('ala_health_check', 'ok');
      const val = await redis.get('ala_health_check');
      result.redis_test = val === 'ok' ? 'OK' : `Beklenmeyen değer: ${val}`;
    } catch (err) {
      result.redis_error = err instanceof Error ? err.message : String(err);
    }
  }

  return NextResponse.json(result);
}
