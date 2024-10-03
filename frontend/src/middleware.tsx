import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("token")?.value;
  const plan = request.cookies.get("plan")?.value;
  const protectedRoutes = ["/dashboard"];
  const publicRoutes = ["/", "/auth/signin", "/auth/signup"];

  const { isTokenValid } = await validateToken(accessToken);

  try {
    if (!plan && request.nextUrl.pathname === "/auth/signup") {
      return NextResponse.redirect(
        new URL("/pricing", request.nextUrl.origin).href
      );
    }

    if (protectedRoutes.includes(request.nextUrl.pathname)) {
      if (!isTokenValid) {
        return NextResponse.redirect(
          new URL("/auth/signin", request.nextUrl.origin).href
        );
      }
    } else if (publicRoutes.includes(request.nextUrl.pathname)) {
      if (isTokenValid) {
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

async function validateToken(token?: string) {
  try {
    const key = process.env.JWT_SECRET_KEY;
    if (!key || !token) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }
    const SECRET_KEY = new TextEncoder().encode(
      "5c13190f1f5ab19da6a803a61f1440e26b581802c373dda6f5b3c34d8de03a09"
    );
    const { payload } = await jwtVerify(token, SECRET_KEY);
    if (!payload.isSubscribed)
      throw new Error("User is not subscribed to the service");
    return { isTokenValid: true };
  } catch (error) {
    console.error(error);
    return { isTokenValid: false };
  }
}
