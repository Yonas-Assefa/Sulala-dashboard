"use server";
import { GOOGLE_SIGNIN_URL } from "@/config/urls";
import { getPhoneNumber, setBrowserCookie } from "../../lib/helper";

import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";

import { redirect } from "next/navigation";
export const googleSingIn = async (accessToken: string) => {
  try {
    const response = await fetch(GOOGLE_SIGNIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: accessToken }),
    });

    const body = await response.json();
    if (!response.ok || !body.success) {
      throw new Error(body.message || "Failed to signin");
    }
    setBrowserCookie(response);

    const successMessage = "Signin successful!.";

    redirect("/auth/account-setup");

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
