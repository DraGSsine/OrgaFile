import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_ROUTES = ["/dashboard", "/payment/successful"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle signup without a plan
  if (pathname === "/auth/signup") {
    const plan = request.cookies.get("plan")?.value;
    if (!["Starter", "Business", "Pro"].includes(plan || "")) {
      return NextResponse.redirect(new URL("/pricing", request.url));
    }
  }

  const accessToken = request.cookies.get("token")?.value;
  const { isTokenValid, isSubscribed } = await validateToken(accessToken);

  // Protect routes that require authentication
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    if (!isTokenValid || !isSubscribed) {
      // Special case for successful payment page
      if (pathname === "/payment/successful" && isTokenValid && !isSubscribed) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  } else {
    // All other routes are considered public
    // Redirect authenticated and subscribed users to dashboard
    if (isTokenValid && isSubscribed && pathname !== "/dashboard") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

async function validateToken(token?: string) {
  if (!token) {
    return { isTokenValid: false, isSubscribed: false };
  }

  try {
    const key = process.env.JWT_SECRET_KEY;
    if (!key) throw new Error("JWT_SECRET_KEY is not set in the environment");

    const { payload } = await jwtVerify(token, new TextEncoder().encode(key));
    return { 
      isTokenValid: true, 
      isSubscribed: payload.isSubscribed as boolean 
    };
  } catch (error) {
    console.error("Token validation error:", error);
    return { isTokenValid: false, isSubscribed: false };
  }
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/auth/:path*",
    "/payment/successful",
    "/pricing",
    "/legal",
    "/demo"
  ],
};

