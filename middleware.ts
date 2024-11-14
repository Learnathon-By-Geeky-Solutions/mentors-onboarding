import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Only run middleware for API routes and admin pages
  if (!request.nextUrl.pathname.startsWith('/api') && 
      !request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Get admin session cookie
  const adminSession = request.cookies.get('admin_session');
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPath = request.nextUrl.pathname === '/admin/login';
  const isRootAdminPath = request.nextUrl.pathname === '/admin';

  // Always redirect /admin to /admin/login
  if (isRootAdminPath) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If trying to access admin pages without session
  if (isAdminPath && !isLoginPath && !adminSession) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If trying to access login page with active session
  if (isLoginPath && adminSession) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*'
  ],
};