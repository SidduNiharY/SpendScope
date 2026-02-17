import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Prototype middleware: protect dashboard routes
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isDashboard = !pathname.startsWith("/login") && !pathname.startsWith("/_next");
  if (!isDashboard) return NextResponse.next();

  // TODO: replace with real auth check (cookie/session)
  // For now, always allow.
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};