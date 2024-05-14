import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
    const isAuthenticated = () => {
        return !!request.cookies.get('access')
    }
    const pathname = request.nextUrl.pathname
    if (!isAuthenticated() && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    } else if (isAuthenticated() && pathname.startsWith('/auth') && !pathname.includes('/create-password')) {
        return NextResponse.redirect(new URL('/dashboard/orders', request.url))
    }
}

export const config = {
    matcher: '/:path*',
}