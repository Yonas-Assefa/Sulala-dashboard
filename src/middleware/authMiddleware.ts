import { NextRequest, NextResponse } from "next/server";

export async function authMiddleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isAuthenticated = () => {
        return !!request.cookies.get("access");
    };

    const isAuthenticationRequiringPath = (pathname: string) => {
        return pathname.includes("/dashboard");
    }

    const isUnauthenticationRequiringPath = (pathname: string) => {
        const paths = [
            "/auth/sign-in",
            "/auth/sign-up",
        ]
        return paths.some((path) => pathname.includes(path));
    }

    if (!isAuthenticated() && isAuthenticationRequiringPath(pathname)) {
        // Redirect to sign in if not authenticated and trying to access dashboard
        return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    } else if (isAuthenticated() && isUnauthenticationRequiringPath(pathname)) {
        // Redirect to dashboard if authenticated and trying to access login or sign up
        return NextResponse.redirect(new URL("/dashboard/settings", request.url));
    } else {
        return;
    }
}