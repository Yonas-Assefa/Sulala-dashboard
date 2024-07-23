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
import { resendVerificationLink } from "./resend-verification-link";
import { getCachedPersonalInfo } from "@/cache/get-cached-personal-info";
import { resendCreatePasswordLink } from "./resend-create-password-link";

export const signIn = async (formState: FormState, formData: FormData) => {
  try {
    const by = formData.get("by")?.toString();

    const data: { email?: string; password?: string; phone_number?: string } =
      {};
    const SIGNIN_URL = by != "phone" ? EMAIL_SIGNIN_URL : PHONE_SIGNIN_URL;

    if (by != "phone") {
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

    const email = formData.get("email")?.toString();

    if (!response.ok) {
      if ("error" in body && email) {
        if (body?.error?.verification_error) {
          await resendVerificationLink({ email });
          return toFormState(
            "INFO",
            "Check your email for verification link",
            `/auth/confirm-letter?email=${encodeURIComponent(email)}&action=signup`,
          );
        } else if (body?.error?.password_set == false) {
          await resendCreatePasswordLink({ email });
          return toFormState(
            "INFO",
            "Check your email for the password setup link",
            `/auth/create-password?email=${encodeURIComponent(email)}`,
          );
        } else {
          throw new Error(getResponseErrorMessage(body) || "Failed to signin");
        }
      }
      throw new Error(getResponseErrorMessage(body) || "Failed to signin");
    }

    setBrowserCookie(response);

    const successMessage =
      by != "phone"
        ? "Signin successful!."
        : "Check your message for the verification code";

    const personalInfo = by != "phone" ? await getCachedPersonalInfo() : null;

    const redirectUrl =
      by != "phone"
        ? personalInfo?.is_superuser
          ? "/dashboard/shops?filter=pending"
          : "/dashboard/settings"
        : `/auth/enter-otp?phone=${encodeURIComponent(data.phone_number!)}&action=signin`;

    return toFormState("SUCCESS", successMessage, redirectUrl);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
