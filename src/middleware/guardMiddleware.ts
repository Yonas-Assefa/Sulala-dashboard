import { NextRequest } from "next/server";
import { guardSetupAccount, guardCreatePassword, guardDashboard, guardManageShop } from "./handlers/middleware.handler";

export async function guardMiddleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // GET WHERE THE USER IS
    const isAtSetupAccount = pathname.includes('/auth/setup-account');
    const isAtCreatePassword = pathname.includes('/auth/create-password');
    const isAtDashboard = pathname.includes('/dashboard');
    const isAtManageShop = pathname.includes('/dashboard/manage');

    // GUARD IMPLEMENTATION
    if (isAtSetupAccount) {
        return guardSetupAccount(request);
    } else if (isAtCreatePassword) {
        return guardCreatePassword(request);
    } else if (isAtDashboard) {
        return guardDashboard(request);
    } else if (isAtManageShop) {
        return guardManageShop(request);
    } else {
        return;
    }
}
