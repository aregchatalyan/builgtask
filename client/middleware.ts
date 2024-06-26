import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('jwt');

  const currentPath = request.nextUrl.pathname;

  if (currentPath === '/' && cookie !== undefined) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  if (currentPath === '/login' && cookie !== undefined) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  if (currentPath === '/register' && cookie !== undefined) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  if (currentPath.startsWith('/profile') && cookie === undefined) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (currentPath.startsWith('/dashboard') && cookie === undefined) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
