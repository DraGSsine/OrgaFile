import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

export async function middleware(request: NextRequest) {
  try {
    const cookie = request.cookies;
    const accessToken = cookie.get("token")?.value;
    const publicRoutes = ["/", "/auth/signin", "/auth/signup", "/pricing"];
    // check if the user in the signup page without a plan
    const plan = cookie.get("plan")?.value as string;
    const isValidPlan =
      plan === "Basic" || plan === "Gold" || plan === "Standard";
    if (request.nextUrl.pathname === "/auth/signup" && !isValidPlan) {
      return NextResponse.redirect(
        new URL("/pricing", request.nextUrl.origin).href
      );
    }
    // Pass the actual token from cookies
    const { isTokenValid, isSubscribed } = await validateToken(accessToken);

    ////// remove this when the project is ready for production ///////
    // if (request.nextUrl.pathname.startsWith("/auth")) {
    //   return NextResponse.redirect(`${request.nextUrl.origin}/#join`);
    // }
    
    if (
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/payment/successful")
    ) {
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
      if (isTokenValid && isSubscribed) {
        return NextResponse.redirect(
          new URL("/dashboard", request.nextUrl.origin).href
        );
      }
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin).href);
  }
}

async function validateToken(token?: string) {
  try {
    const key = process.env.JWT_SECRET_KEY;
    if (!key) throw new Error("JWT_SECRET_KEY does not exist in the env");
    if (!token) {
      console.error("Token is missing");
      return { isTokenValid: false, isSubscribed: false };
    }

    const SECRET_KEY = new TextEncoder().encode(key);
    const { payload } = await jwtVerify(token, SECRET_KEY);

    return { isTokenValid: true, isSubscribed: payload.isSubscribed };
  } catch (error) {
    console.error("Error validating token:", error);
    return { isTokenValid: false, isSubscribed: false };
  }
}

// Config matcher for the middleware
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/auth/:path*",
    "/payment/successful",
    "/pricing",
  ],
};
