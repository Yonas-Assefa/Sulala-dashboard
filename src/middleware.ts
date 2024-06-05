import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middleware/authMiddleware";
import { i18nMiddleware } from "./middleware/i18nMiddleware";

import createMiddleware from 'next-intl/middleware';
import { LOCALES } from "./i18n/config";

const nextIntlMiddleware = createMiddleware({
  locales: LOCALES,

  defaultLocale: 'ar'
});

const middlewares = [
  // i18nMiddleware,
  authMiddleware,
  nextIntlMiddleware
];


export async function middleware(request: NextRequest) {
  for (const fn of middlewares) {
    const response = await fn(request);
    if (response) return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/).*auth/.*)',
    '/((?!_next/).*dashboard/.*)',
    '/(ar|en)/:path*'
  ],

};
