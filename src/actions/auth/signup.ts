"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { SIGNUP_URL } from "../../config/urls";
import { emailSignUpSchema, phoneAuthSchema } from "../schema/zod-schema";
import {
  getPhoneNumber,
  getResponseBody,
  getResponseErrorMessage,
  setBrowserCookie,
} from "../../lib/helper";
import cache from "@/cache/node-cache";
import { revalidateCachedPersonalInfo } from "@/cache/get-cached-personal-info";

export const signUp = async (formState: FormState, formData: FormData) => {
  try {
    const by = formData.get("by")?.toString();

    const data: { phone_number?: string; email?: string } = {};

    if (by != "phone") {
      const ZodObj = emailSignUpSchema.parse({
        email: formData.get("email"),
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

    const response = await fetch(SIGNUP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body = await getResponseBody(response);
    if (!response.ok) {
      throw new Error(getResponseErrorMessage(body) || "Failed to sign up");
    }

    setBrowserCookie(response);

    await revalidateCachedPersonalInfo();

    const successMessage =
      by != "phone"
        ? "Check your email for the verification link"
        : "Check your message for the verification code";

    const redirectUrl =
      by != "phone"
        ? `/auth/confirm-letter?email=${encodeURIComponent(data.email!)}&action=signup`
        : `/auth/enter-otp?phone=${encodeURIComponent(data.phone_number!)}&action=signup`;

    return toFormState(
      "SUCCESS",
      `Signup successful! ${successMessage}.`,
      redirectUrl,
    );
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
