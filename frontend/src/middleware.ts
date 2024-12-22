import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies;
  const accessToken = cookie.get("token")?.value;
  const plan = cookie.get("plan")?.value;
  const protectedRoutes = ["/dashboard"];
  const publicRoutes = ["/", "/auth/signin", "/auth/signup", "/pricing"];

  const { isTokenValid, isSubscribed } = await validateToken(accessToken);
  try {
    if (protectedRoutes.includes(request.nextUrl.pathname)) {
      if (!isTokenValid || !isSubscribed) {
        if (
          !isSubscribed &&
          isTokenValid &&
          request.nextUrl.pathname === "/payment/successful"
        )
          return NextResponse.next();
        return NextResponse.redirect(
          new URL("/auth/signin", request.nextUrl.origin).href
        );
      }
    } else if (publicRoutes.includes(request.nextUrl.pathname)) {
      console.log(request.nextUrl.pathname);
      if (request.nextUrl.pathname === "/auth/signup" && !plan) {
        return NextResponse.redirect(
          new URL("/pricing", request.nextUrl.origin).href
        );
      }
      if (isTokenValid && isSubscribed) {
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
    if (!key) throw new Error("JWT_SECRET_KEY does not exist in the env");
    if (!token) throw new Error("Token is missing");
    const SECRET_KEY = new TextEncoder().encode(key);
    const { payload } = await jwtVerify(token, SECRET_KEY);

    return { isTokenValid: true, isSubscribed: payload.isSubscribed };
  } catch (error) {
    console.info(error);
    return { isTokenValid: false, isSubscribed: false };
  }
}
