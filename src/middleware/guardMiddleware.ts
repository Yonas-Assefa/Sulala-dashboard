import { getPersonalInfo } from "@/actions/settings/get-personal-info";
import { NextRequest, NextResponse } from "next/server";
import { guardSetupAccount, guardCreatePassword, guardDashboardSettings, guardManageShop } from "./handlers/middleware.handler";

export async function guardMiddleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // GET WHERE THE USER IS
    const isAtSetupAccount = pathname.includes('/auth/setup-account');
    const isAtCreatePassword = pathname.includes('/auth/create-password');
    const isAtDashboardSettings = pathname.includes('/dashboard/settings');
    const isAtManageShop = pathname.includes('/dashboard/manage');

    // GUARD IMPLEMENTATION
    if (isAtSetupAccount) {
        return guardSetupAccount(request);
    } else if (isAtCreatePassword) {
        return guardCreatePassword(request);
    } else if (isAtDashboardSettings) {
        return guardDashboardSettings(request);
    } else if (isAtManageShop) {
        return guardManageShop(request);
    } else {
        return;
    }
}
