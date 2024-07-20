import { NextRequest, NextResponse } from "next/server";

export async function mobileMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/product")) {
    return NextResponse.redirect("https://play.google.com/store/apps");
  }
}
