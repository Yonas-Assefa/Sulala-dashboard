import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middleware/authMiddleware";
import { i18nMiddleware } from "./middleware/i18nMiddleware";

const middlewares = [
  i18nMiddleware,
  authMiddleware,
];

export async function middleware(request: NextRequest) {
  for (const fn of middlewares) {
    const response = await fn(request);
    if (response) return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
