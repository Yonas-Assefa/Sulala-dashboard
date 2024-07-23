import { NextRequest } from "next/server";
import {
  guardSetupAccount,
  guardCreatePassword,
  guardDashboard,
  guardAdminOnly,
  guardConfirmLetter,
} from "./handlers/middleware.handler";

export async function guardMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // GET WHERE THE USER IS
  const isAtSetupAccount = pathname.includes("/auth/setup-account");
  const isAtCreatePassword = pathname.includes("/auth/create-password");
  const isAtConfirmLetter = pathname.includes("/auth/confirm-letter");
  const isAtDashboard = pathname.includes("/dashboard");
  const isAtManage =
    pathname.includes("/dashboard/shops") ||
    pathname.includes("/dashboard/customer-support");

  // GUARD IMPLEMENTATION
  if (isAtSetupAccount) {
    return guardSetupAccount(request);
  } else if (isAtCreatePassword) {
    return guardCreatePassword(request);
  } else if (isAtConfirmLetter) {
    return guardConfirmLetter(request);
  } else if (isAtDashboard) {
    return guardDashboard(request);
  } else if (isAtManage) {
    return guardAdminOnly(request);
  } else {
    return;
  }
}
