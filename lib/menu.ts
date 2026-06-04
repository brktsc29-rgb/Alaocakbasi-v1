import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface MenuItem {
  id: string;
  category: 'baslangic' | 'ana' | 'tatli' | 'icecek';
  name: string;
  description: string;
  price: string;
  special: boolean;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'menu.json');
const REDIS_KEY = 'ala_menu';

// ─── Filesystem fallback (local dev) ──────────────────────────────────────────

function readFromFile(): MenuItem[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as MenuItem[];
  } catch {
    return [];
  }
}

function writeToFile(items: MenuItem[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
}

// ─── Redis (Upstash) ──────────────────────────────────────────────────────────

async function getRedis() {
  const { Redis } = await import('@upstash/redis');
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function readMenu(): Promise<MenuItem[]> {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    return readFromFile();
  }
  try {
    const redis = await getRedis();
    const stored = await redis.get<MenuItem[]>(REDIS_KEY);
    if (stored !== null && stored !== undefined) return stored;

    // First deploy: seed Redis from bundled data/menu.json
    const seed = readFromFile();
    if (seed.length > 0) await redis.set(REDIS_KEY, seed);
    return seed;
  } catch {
    return readFromFile();
  }
}

export async function writeMenu(items: MenuItem[]): Promise<void> {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    writeToFile(items);
    return;
  }
  const redis = await getRedis();
  await redis.set(REDIS_KEY, items);
}

export function generateId(): string {
  return crypto.randomUUID().slice(0, 8);
}
