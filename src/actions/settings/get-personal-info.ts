"use server";

import { Console } from "@/lib/print";
import { GET_VENDOR_ACCOUNT as GET_VENDOR_PROFILE } from "../../config/urls";
import { getRequestHeaders, getResponseBody } from "../../lib/helper";

export const getPersonalInfo = async () => {
  Console.info("get_personal_info_called");
  const response = await fetch(GET_VENDOR_PROFILE, {
    method: "GET",
    headers: getRequestHeaders(),
  });
  const body = await getResponseBody(response);

  if (!response.ok) {
    // throw new Error(body.message || "Failed to get profile");
    return null;
  }

  const personalInfo = body.data;
  return personalInfo;
};
