"use server";
import { GOOGLE_SIGNIN_URL } from "@/config/urls";
import {
  getPhoneNumber,
  getResponseBody,
  setBrowserCookie,
} from "../../lib/helper";

import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { getPersonalInfo } from "../settings/get-personal-info";

import { redirect } from "@/i18n/navigation";
export const googleSingIn = async (accessToken: string) => {
  try {
    const response = await fetch(GOOGLE_SIGNIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: accessToken }),
    });

    const body = await getResponseBody(response);
    setBrowserCookie(response);
    if (!response.ok || !body.success) {
      throw new Error(body.message || "Failed to signin");
    }

    const personalInfo = await getPersonalInfo();
    const shop = personalInfo?.shops?.[0];
    console.log("response of google2: ");
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
