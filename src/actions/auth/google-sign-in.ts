"use server";
import { GOOGLE_SIGNIN_URL } from "@/config/urls";
import {
  getResponseBody,
  getResponseErrorMessage,
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

    const responseBody = await getResponseBody(response);
    setBrowserCookie(response);

    if (responseBody.status == "fail") {
      throw new Error(
        getResponseErrorMessage(responseBody) || "Failed to sign in",
      );
    }
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
