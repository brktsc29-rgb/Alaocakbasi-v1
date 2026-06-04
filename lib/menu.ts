import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_FILE = path.join(process.cwd(), 'data', 'menu.json');

export interface MenuItem {
  id: string;
  category: 'baslangic' | 'ana' | 'tatli' | 'icecek';
  name: string;
  description: string;
  price: string;
  special: boolean;
}

export function readMenu(): MenuItem[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw) as MenuItem[];
  } catch {
    return [];
  }
}

export function writeMenu(items: MenuItem[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
}

export function generateId(): string {
  return crypto.randomUUID().slice(0, 8);
}
