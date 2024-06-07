
import { getPersonalInfo } from "@/actions/settings/get-personal-info";
import { NextRequest, NextResponse } from "next/server";

export const isAuthenticated = (request: NextRequest) => {
    return !!request?.cookies?.get("access");
};


export const guardSetupAccount = async (request: NextRequest) => {
    if (!isAuthenticated(request)) {
        return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    const personalInfo = await getPersonalInfo();
    const shop = personalInfo?.shops?.[0];
    const stage = request.nextUrl.searchParams.get('stage');
    if (!shop) {
        if (stage === 'one') {
            return;
        }
        return NextResponse.redirect(new URL('/auth/setup-account?stage=one', request.url));
    } else if (shop && shop.categories?.length === 0) {
        if (stage === 'two') {
            return;
        }
        return NextResponse.redirect(new URL('/auth/setup-account?stage=two', request.url));
    } else if (shop && !shop.tax_forms?.length) {
        if (stage === 'three') {
            return;
        }
        return NextResponse.redirect(new URL('/auth/setup-account?stage=three', request.url));
    } else {
        return NextResponse.redirect(new URL('/dashboard/settings', request.url));
    }
}


export const guardCreatePassword = async (request: NextRequest) => {
    if (!isAuthenticated(request)) {
        return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    const personalInfo = await getPersonalInfo();
    if (personalInfo?.is_password_set) {
        return NextResponse.redirect(new URL('/dashboard/settings', request.url));
    } else {
        return;
    }
}


export const guardDashboardSettings = async (request: NextRequest) => {
    if (!isAuthenticated(request)) {
        return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    const personalInfo = await getPersonalInfo();
    if (!personalInfo?.shops?.length) {
        return NextResponse.redirect(new URL('/auth/setup-account', request.url));
    } else {
        return;
    }
}


export const guardManageShop = async (request: NextRequest) => {
    if (!isAuthenticated(request)) {
        return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    const personalInfo = await getPersonalInfo();
    if (!personalInfo?.is_superuser) {
        return NextResponse.redirect(new URL('/auth/unauthorized', request.url));
    } else {
        return;
    }
}

export const isAuthenticationRequiringPath = (pathname: string) => {
    return pathname.includes("/dashboard");
}


export const isUnauthenticationRequiringPath = (pathname: string) => {
    const paths = [
        "/auth/sign-in",
        "/auth/sign-up",
    ]
    return paths.some((path) => pathname.includes(path));
}