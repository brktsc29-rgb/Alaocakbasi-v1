import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOCALES = ['tr', 'en', 'de', 'ar', 'ru', 'fr'];
const DEFAULT_LOCALE = 'tr';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin routes ──────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    if (pathname !== '/admin/login') {
      const token = request.cookies.get('ala_admin');
      if (!token?.value) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
    return NextResponse.next();
  }

  // ── Skip internal Next.js routes, API and static files ───────
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt'
  ) {
    return NextResponse.next();
  }

  // ── Locale routing ────────────────────────────────────────────
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (!hasLocale) {
    // Detect preferred language from Accept-Language header
    const accepted = request.headers.get('accept-language') ?? '';
    const preferred =
      LOCALES.find((l) => accepted.toLowerCase().includes(l)) ?? DEFAULT_LOCALE;

    const url = request.nextUrl.clone();
    url.pathname = `/${preferred}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
