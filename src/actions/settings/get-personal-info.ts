"use server";

import { GET_VENDOR_ACCOUNT as GET_VENDOR_PROFILE } from "../../config/urls";
import {
  cachePersonalInfo,
  getRequestHeaders,
  getResponseBody,
  retrievePersonalInfo,
} from "../../lib/helper";

export const getPersonalInfo = async () => {
  const cachedPersonalInfo = retrievePersonalInfo();
  if (cachedPersonalInfo) {
    return cachedPersonalInfo;
  }

  const response = await fetch(GET_VENDOR_PROFILE, {
    method: "GET",
    headers: getRequestHeaders(),
  });
  const body = await getResponseBody(response);

  if (!response.ok || !body.success) {
    throw new Error(body.message || "Failed to get profile");
  }

  const personalInfo = body.data;
  if (
    personalInfo &&
    personalInfo.email_verified &&
    personalInfo.is_password_set &&
    personalInfo?.shops?.length > 0
  ) {
    cachePersonalInfo(personalInfo);
  }
  return personalInfo;
};
