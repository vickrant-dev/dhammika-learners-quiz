// src/middleware.js
import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;

  // Redirect to login if trying to access /admin or /dashboard and not logged in
  if ((pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) && !user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Restrict access to /admin for non-admins
  if (pathname.startsWith('/admin')) {
    const { data: userProfile, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (error || userProfile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Restrict access to /dashboard for non-students
  if (pathname.startsWith('/dashboard')) {
    const { data: userProfile, error } = await supabase
      .from('students')
      .select('role')
      .eq('id', user.id)
      .single();

    if (error || userProfile?.role !== 'student') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/dashboard'],
};
