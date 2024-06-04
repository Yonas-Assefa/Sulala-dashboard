import { NextRequest, NextResponse } from "next/server";

export async function authMiddleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isAuthenticated = () => {
        return !!request.cookies.get("access");
    };
    if (!isAuthenticated() && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    } else if (
        isAuthenticated() &&
        pathname.startsWith("/auth") &&
        !pathname.includes("/create-password") &&
        !pathname.includes("/setup-account") &&
        !pathname.includes("/confirm-letter") &&
        !pathname.includes("/verify-email") &&
        !pathname.includes("/approval") &&
        !pathname.includes("/continue-with-phone") &&
        !pathname.includes("/setup-complete")
    ) {
        return NextResponse.redirect(new URL("/dashboard/settings", request.url));
    }
}