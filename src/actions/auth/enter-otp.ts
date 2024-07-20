"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { CONFIRM_PHONE, VERIFY_PHONE } from "../../config/urls";
import { otpVerificationSchema } from "../schema/zod-schema";
import {
  getResponseBody,
  getResponseErrorMessage,
  makeRequest,
  setBrowserCookie,
} from "../../lib/helper";
import {
  getCachedPersonalInfo,
  revalidateCachedPersonalInfo,
} from "@/cache/get-cached-personal-info";

export const enterOtp = async (formState: FormState, formData: FormData) => {
  try {
    const data = otpVerificationSchema.parse({
      phone_number: formData.get("phone_number"),
      otp: formData.get("otp")?.toString(),
    });

    const action = formData.get("action")?.toString();

    const response =
      action == "signup"
        ? await makeRequest(VERIFY_PHONE, data, "PATCH")
        : await makeRequest(CONFIRM_PHONE, data, "POST");

    const body = await getResponseBody(response);

    if (!response.ok) {
      throw new Error(
        getResponseErrorMessage(body) || "Failed to verify phone number",
      );
    }

    setBrowserCookie(response);

    const successMessage = "Verification successful!";

    const personalInfo = await getCachedPersonalInfo();

    const redirectUrl =
      action === "signup"
        ? "/auth/setup-account"
        : personalInfo?.is_superuser
          ? "/dashboard/shops?filter=pending"
          : "/dashboard/settings";

    await revalidateCachedPersonalInfo();

    return toFormState("SUCCESS", successMessage, redirectUrl);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
