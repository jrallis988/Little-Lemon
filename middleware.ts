import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth-shared";

/** Public member-app routes that skip the session gate. */
const PUBLIC_APP_PATHS = ["/app/login"];

function isPublicAppPath(pathname: string) {
  return PUBLIC_APP_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

/**
 * Lightweight gate for /app/* — full signature verify happens in API/RSC via lib/auth.
 * Middleware only requires a present session cookie (or login route).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/app")) {
    return NextResponse.next();
  }

  if (isPublicAppPath(pathname)) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (token && pathname === "/app/login") {
      const reason = request.nextUrl.searchParams.get("reason");
      if (reason === "expired" || reason === "update") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/app", request.url));
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    const login = new URL("/app/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
