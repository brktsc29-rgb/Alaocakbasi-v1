import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'ala2024';
const SECRET = process.env.AUTH_SECRET ?? 'ala-ocakbasi-gizli-2024';

export function createToken(): string {
  return crypto
    .createHmac('sha256', SECRET)
    .update(ADMIN_PASSWORD)
    .digest('hex');
}

export function verifyToken(token: string): boolean {
  const expected = createToken();
  try {
    return crypto.timingSafeEqual(
      Buffer.from(token, 'hex'),
      Buffer.from(expected, 'hex')
    );
  } catch {
    return false;
  }
}

export function checkPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export const COOKIE_NAME = 'ala_admin';
export const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 saat
