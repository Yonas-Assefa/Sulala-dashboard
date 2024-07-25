"use server";

import { GET_VENDOR_ACCOUNT as GET_VENDOR_PROFILE } from "../../config/urls";
import { getRequestHeaders, getResponseBody } from "../../lib/helper";
import { redirect } from "next/navigation";

export const getPersonalInfo = async () => {
  console.info("GET /personal-info");
  const response = await fetch(GET_VENDOR_PROFILE, {
    method: "GET",
    headers: getRequestHeaders(),
  });
  const body = await getResponseBody(response);

  const status = response.status;

  if (status === 401) {
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    // throw new Error(body.message || "Failed to get profile");
    return null;
  }

  const personalInfo = body.data;
  return personalInfo;
};
