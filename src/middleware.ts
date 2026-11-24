import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/adminAuth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/news and all sub-routes under /admin (except the /admin login page itself)
  if (pathname.startsWith('/admin/news')) {
    const cookie = request.cookies.get(SESSION_COOKIE_NAME);
    const isValid = await verifySessionToken(cookie?.value);

    if (!isValid) {
      const loginUrl = new URL('/admin', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already authenticated and visiting the login page /admin, auto-redirect to dashboard
  if (pathname === '/admin') {
    const cookie = request.cookies.get(SESSION_COOKIE_NAME);
    if (cookie?.value) {
      const isValid = await verifySessionToken(cookie.value);
      if (isValid) {
        return NextResponse.redirect(new URL('/admin/news', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
