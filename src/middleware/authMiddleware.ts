import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated, isAuthenticationRequiringPath, isUnauthenticationRequiringPath } from "./handlers/middleware.handler";

export async function authMiddleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (!isAuthenticated(request) && isAuthenticationRequiringPath(pathname)) {
        // Redirect to sign in if not authenticated and trying to access dashboard
        return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    } else if (isAuthenticated(request) && isUnauthenticationRequiringPath(pathname)) {
        // Redirect to dashboard if authenticated and trying to access login or sign up
        return NextResponse.redirect(new URL("/dashboard/settings", request.url));
    } else {
        return;
    }
}