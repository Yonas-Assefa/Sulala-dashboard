import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middleware/authMiddleware";
import { i18nMiddleware } from "./middleware/i18nMiddleware";
import { guardMiddleware } from "./middleware/guardMiddleware";

const middlewares = [
  guardMiddleware,
  authMiddleware,
  i18nMiddleware,
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
