"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { EMAIL_SIGNIN_URL, PHONE_SIGNIN_URL } from "../../config/urls";
import { emailSignInSchema, phoneAuthSchema } from "../schema/zod-schema";
import {
  getPhoneNumber,
  getResponseBody,
  getResponseErrorMessage,
  setBrowserCookie,
} from "../../lib/helper";
import { getPersonalInfo } from "../settings/get-personal-info";

export const signIn = async (formState: FormState, formData: FormData) => {
  try {
    const by = formData.get("by")?.toString();

    const data: { email?: string; password?: string; phone_number?: string } =
      {};
    const SIGNIN_URL = by == "email" ? EMAIL_SIGNIN_URL : PHONE_SIGNIN_URL;

    if (by == "email") {
      const ZodObj = emailSignInSchema.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      });
      Object.assign(data, { ...ZodObj });
    } else {
      const ZodObj = phoneAuthSchema.parse({
        phone_number: getPhoneNumber({
          phone_number: formData.get("phone_number"),
          country_code: formData.get("country_code"),
        }),
      });
      Object.assign(data, { ...ZodObj });
    }

    const response = await fetch(SIGNIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body = await getResponseBody(response);

    if (!response.ok || !body.success) {
      throw new Error(getResponseErrorMessage(body) || "Failed to signin");
    }

    setBrowserCookie(response);

    const successMessage =
      by == "email"
        ? "Signin successful!."
        : "Check your message for the verification code";

    const personalInfo = by == "email" ? await getPersonalInfo() : null;

    const redirectUrl =
      by == "email"
        ? personalInfo?.is_superuser
          ? "/dashboard/shops?filter=pending"
          : "/dashboard/settings"
        : `/auth/enter-otp?phone=${encodeURIComponent(data.phone_number!)}&action=signin`;

    return toFormState("SUCCESS", successMessage, redirectUrl);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
