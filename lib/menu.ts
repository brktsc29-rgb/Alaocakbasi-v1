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
const KV_KEY = 'ala_menu_items';

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

// ─── KV helpers (lazy import to avoid errors when SDK not configured) ─────────

async function getKv() {
  const { kv } = await import('@vercel/kv');
  return kv;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function readMenu(): Promise<MenuItem[]> {
  if (!process.env.KV_REST_API_URL) {
    return readFromFile();
  }
  try {
    const kv = await getKv();
    const stored = await kv.get<MenuItem[]>(KV_KEY);
    if (stored !== null && stored !== undefined) return stored;

    // KV is empty on first deploy — seed from bundled JSON
    const seed = readFromFile();
    if (seed.length > 0) await kv.set(KV_KEY, seed);
    return seed;
  } catch {
    return readFromFile();
  }
}

export async function writeMenu(items: MenuItem[]): Promise<void> {
  if (!process.env.KV_REST_API_URL) {
    writeToFile(items);
    return;
  }
  try {
    const kv = await getKv();
    await kv.set(KV_KEY, items);
  } catch (err) {
    throw new Error(`Menü kaydedilemedi: ${(err as Error).message}`);
  }
}

export function generateId(): string {
  return crypto.randomUUID().slice(0, 8);
}
