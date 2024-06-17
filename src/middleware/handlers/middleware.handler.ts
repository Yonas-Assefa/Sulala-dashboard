import { getPersonalInfo } from "@/actions/settings/get-personal-info";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const isAuthenticated = (request: NextRequest) => {
  return !!request?.cookies?.get("access");
};

export const isMobile = () => {
  const userAgent = headers().get("user-agent");
  return /android.+mobile|ip(hone|[oa]d)/i.test(userAgent!);
};

export const guardSetupAccount = async (request: NextRequest) => {
  if (!isAuthenticated(request)) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  const personalInfo = await getPersonalInfo();

  if (personalInfo?.is_superuser)
    return NextResponse.redirect(new URL("/dashboard/manage", request.url));

  const shop = personalInfo?.shops?.[0];
  const stage = request.nextUrl.searchParams.get("stage");
  const { last_name, first_name, email } = personalInfo;

  if (!personalInfo?.is_password_set) {
    return NextResponse.redirect(new URL("/auth/create-password", request.url));
  }
  // else if (!shop) {
  else if (!last_name || !first_name || !email) {
    if (stage === "one") {
      return;
    }
    return NextResponse.redirect(
      new URL("/auth/setup-account?stage=one", request.url),
    );
    // } else if (!shop || (shop && shop.categories?.length === 0)) {
  } else if (!shop) {
    if (stage === "two" || stage === "three") {
      return;
    }
    return NextResponse.redirect(
      new URL("/auth/setup-account?stage=two", request.url),
    );
  }
  // else if (shop && !shop.tax_forms?.length) {
  //     if (stage === 'three') {
  //         return;
  //     }
  //     return NextResponse.redirect(new URL('/auth/setup-account?stage=three', request.url));
  // }
  else {
    return NextResponse.redirect(new URL("/dashboard/settings", request.url));
  }
};

export const guardCreatePassword = async (request: NextRequest) => {
  if (!isAuthenticated(request)) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  const personalInfo = await getPersonalInfo();

  if (personalInfo?.is_superuser)
    return NextResponse.redirect(new URL("/dashboard/manage", request.url));

  if (!personalInfo?.email_verified) {
    return NextResponse.redirect(
      new URL(
        `/auth/confirm-letter?email=${personalInfo?.email}'`,
        request.url,
      ),
    );
  } else if (personalInfo?.is_password_set) {
    return NextResponse.redirect(new URL("/dashboard/settings", request.url));
  } else {
    return;
  }
};

export const guardDashboard = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  if (!isAuthenticated(request)) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  const personalInfo = await getPersonalInfo();

  if (personalInfo?.is_superuser) {
    if (pathname.includes("/dashboard/manage")) {
      return;
    } else {
      return NextResponse.redirect(new URL("/dashboard/manage", request.url));
    }
  }

  if (!personalInfo?.is_password_set) {
    return NextResponse.redirect(new URL("/auth/create-password", request.url));
  } else if (!personalInfo?.shops?.length) {
    return NextResponse.redirect(new URL("/auth/setup-account", request.url));
  } else if (!personalInfo?.has_onboarded) {
    return NextResponse.redirect(
      new URL(`/auth/setup-complete?email=${personalInfo?.email}`, request.url),
    );
  } else {
    return;
  }
};

export const guardManageShop = async (request: NextRequest) => {
  if (!isAuthenticated(request)) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  const personalInfo = await getPersonalInfo();
  if (!personalInfo?.is_superuser) {
    return NextResponse.redirect(new URL("/auth/unauthorized", request.url));
  } else {
    return;
  }
};

export const isAuthenticationRequiringPath = (pathname: string) => {
  return pathname.includes("/dashboard");
};

export const isUnauthenticationRequiringPath = (pathname: string) => {
  const paths = ["/auth/sign-in", "/auth/sign-up"];
  return paths.some((path) => pathname.includes(path));
};
