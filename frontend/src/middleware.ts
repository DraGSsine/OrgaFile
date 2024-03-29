import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("userInfo")?.value;

  try {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      if (!accessToken) {
        return NextResponse.redirect(
          new URL("/auth/signin", request.nextUrl.origin).href
        );
      }
    } else if (request.nextUrl.pathname.startsWith("/auth")) {
      if (accessToken) {
        return NextResponse.redirect(new URL("/", request.nextUrl.origin).href);
      }
    }
  } catch (error) {
    console.error("Error verifying access token:", error);
    return NextResponse.redirect(new URL("/", request.nextUrl.origin).href);
  }

  return NextResponse.next();
}