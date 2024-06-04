
import { NextRequest, NextResponse } from "next/server";

const locales = ['en', 'fr', 'sp']

export async function i18nMiddleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )
    console.log({ pathnameHasLocale, pathname })
    if (pathnameHasLocale) return

    const locale = locales[0]
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}