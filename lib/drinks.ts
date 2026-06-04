import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface DrinkItem {
  id: string;
  type: 'raki' | 'wine';
  name: string;
  region: string;
  note: string;
  year: string;
  price: string;
  featured: boolean;
  grape?: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'drinks.json');
const REDIS_KEY = 'ala_drinks';

function readFromFile(): DrinkItem[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as DrinkItem[];
  } catch {
    return [];
  }
}

function writeToFile(items: DrinkItem[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
}

async function getRedis() {
  const { Redis } = await import('@upstash/redis');
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

export async function readDrinks(): Promise<DrinkItem[]> {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    return readFromFile();
  }
  try {
    const redis = await getRedis();
    const stored = await redis.get<DrinkItem[]>(REDIS_KEY);
    if (stored !== null && stored !== undefined) return stored;
    const seed = readFromFile();
    if (seed.length > 0) await redis.set(REDIS_KEY, seed);
    return seed;
  } catch {
    return readFromFile();
  }
}

export async function writeDrinks(items: DrinkItem[]): Promise<void> {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    if (process.env.VERCEL) {
      throw new Error(
        'Redis yapılandırılmamış. Vercel → Settings → Environment Variables bölümüne UPSTASH_REDIS_REST_URL ve UPSTASH_REDIS_REST_TOKEN ekleyin.'
      );
    }
    writeToFile(items);
    return;
  }
  const redis = await getRedis();
  await redis.set(REDIS_KEY, items);
}

export function generateDrinkId(): string {
  return crypto.randomUUID().slice(0, 8);
}
