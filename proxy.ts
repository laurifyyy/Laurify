import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session;
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") {
    if (isLoggedIn) return NextResponse.redirect(new URL("/admin", req.nextUrl));
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
