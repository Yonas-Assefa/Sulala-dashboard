"use server";

import cache from "@/cache/node-cache";
import { LOGOUT } from "../../config/urls";
import { clearBrowserCookie, getRequestHeaders } from "../../lib/helper";
import { redirect } from "@/i18n/navigation";
import { invalidateCachedPersonalInfo } from "@/cache/get-cached-personal-info";

export const logout = () => {
  // fetch(LOGOUT, {
  //   method: "POST",
  //   headers: getRequestHeaders(),
  // });

  invalidateCachedPersonalInfo();

  clearBrowserCookie();

  redirect("/auth/sign-in");
};
