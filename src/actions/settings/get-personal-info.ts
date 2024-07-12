"use server";

import { GET_VENDOR_ACCOUNT as GET_VENDOR_PROFILE } from "../../config/urls";
import { getRequestHeaders, getResponseBody } from "../../lib/helper";

export const getPersonalInfo = async () => {
  const response = await fetch(GET_VENDOR_PROFILE, {
    method: "GET",
    headers: getRequestHeaders(),
  });
  const body = await getResponseBody(response);

  if (!response.ok) {
    throw new Error(body.message || "Failed to get profile");
  }

  const personalInfo = body.data;
  return personalInfo;
};
