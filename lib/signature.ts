import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface SignatureDish {
  id: string;
  name: string;
  price: string;
  subtitle: string;
  description: string;
  tag: string;
  image: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'signature.json');
const REDIS_KEY = 'ala_signature';
const MAX_DISHES = 4;

export { MAX_DISHES };

function readFromFile(): SignatureDish[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as SignatureDish[];
  } catch {
    return [];
  }
}

function writeToFile(items: SignatureDish[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
}

async function getRedis() {
  const { Redis } = await import('@upstash/redis');
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

export async function readSignature(): Promise<SignatureDish[]> {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    return readFromFile();
  }
  try {
    const redis = await getRedis();
    const stored = await redis.get<SignatureDish[]>(REDIS_KEY);
    if (stored !== null && stored !== undefined) return stored;
    const seed = readFromFile();
    if (seed.length > 0) await redis.set(REDIS_KEY, seed);
    return seed;
  } catch {
    return readFromFile();
  }
}

export async function writeSignature(items: SignatureDish[]): Promise<void> {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    if (process.env.VERCEL) {
      throw new Error('Redis yapılandırılmamış.');
    }
    writeToFile(items);
    return;
  }
  const redis = await getRedis();
  await redis.set(REDIS_KEY, items);
}

export function generateSignatureId(): string {
  return crypto.randomUUID().slice(0, 8);
}
