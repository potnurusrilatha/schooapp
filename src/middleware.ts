import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

  const supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  console.log("User from middleware:", user);

  // Protected routes that require authentication
  const protectedRoutes = [
    /^\/create$/,           // Creating posts
    /^\/edit\/.+$/,         // Editing posts
    /^\/profile$/,          // User profile
  ];

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    route.test(request.nextUrl.pathname)
  );

  // If user is not logged in and trying to access protected routes
  if (!user && isProtectedRoute) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = "/auth/login";
    // Add redirect parameter to send user back after login
    newUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(newUrl);
  }

  // If user IS logged in and trying to access login/signup pages
  // Redirect them to home
  const authPages = ['/login', '/signup'];
  if (user && authPages.includes(request.nextUrl.pathname)) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = "/";
    return NextResponse.redirect(newUrl);
  }

  return supabaseResponse;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};