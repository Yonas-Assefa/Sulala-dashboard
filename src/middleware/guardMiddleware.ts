import { NextRequest } from "next/server";
import {
  guardSetupAccount,
  guardCreatePassword,
  guardDashboard,
  guardAdminOnly,
  guardConfirmLetter,
} from "./handlers/middleware.handler";
import routes from "@/app/[lang]/dashboard/components/sideBarRoutes";

export async function guardMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const superAdminPaths = routes
    .filter((route) => route.protected)
    .map((route) => route.path)
    .map((path) => path.split("?")[0]);

  // GET WHERE THE USER IS
  const isAtSetupAccount = pathname.includes("/auth/setup-account");
  const isAtCreatePassword = pathname.includes("/auth/create-password");
  const isAtConfirmLetter = pathname.includes("/auth/confirm-letter");
  const isAtDashboard = pathname.includes("/dashboard");
  const isAtManage = superAdminPaths.some((path) => pathname.includes(path));

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
