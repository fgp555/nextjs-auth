import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/login", "/register", "/"];

  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  console.log("token", token);

  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
