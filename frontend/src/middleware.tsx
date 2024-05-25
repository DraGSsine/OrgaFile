import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("token")?.value;
  const plan = request.cookies.get("plan")?.value;
  const protectedRoutes = ["/dashboard"];
  const publicRoutes = ["/", "/auth/signin", "/auth/signup"];
  try {
    if (!plan && request.nextUrl.pathname == "/auth/signup") {
      return NextResponse.redirect(
        new URL("/pricing", request.nextUrl.origin).href
      );
    }
    if (protectedRoutes.includes(request.nextUrl.pathname)) {
      if (!accessToken) {
        return NextResponse.redirect(
          new URL("/auth/signin", request.nextUrl.origin).href
        );
      }
    } else if (publicRoutes.includes(request.nextUrl.pathname)) {
      if (accessToken) {
        return NextResponse.redirect(
          new URL("/dashboard", request.nextUrl.origin).href
        );
      }
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin).href);
  }

  return NextResponse.next();
}
