
import { LOCALES } from "@/i18n/config";
import { NextRequest, NextResponse } from "next/server";

export async function i18nMiddleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    console.log({ pathname })
    const pathnameHasLocale = LOCALES.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )
    console.log({ pathnameHasLocale, pathname })
    if (pathnameHasLocale) return

    const locale = LOCALES[0]
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}