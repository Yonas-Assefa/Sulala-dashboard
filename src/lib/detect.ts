import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const isAuthenticated = (request: NextRequest) => {
  return !!request?.cookies?.get("access");
};

export const isMobile = () => {
  const userAgent = headers().get("user-agent");
  return /android.+mobile|ip(hone|[oa]d)/i.test(userAgent!);
};
