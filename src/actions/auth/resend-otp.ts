"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { RESEND_OTP } from "../../config/urls";
import { resendOtpSchema } from "../schema/zod-schema";
import {
  getResponseBody,
  getResponseErrorMessage,
  makeRequest,
  setBrowserCookie,
} from "../../lib/helper";

export const resendOtp = async ({ phone_number }: { phone_number: string }) => {
  try {
    const data = resendOtpSchema.parse({
      phone_number,
    });

    const response = await makeRequest(RESEND_OTP, data, "PATCH");

    const body = await getResponseBody(response);

    if (!response.ok) {
      throw new Error(getResponseErrorMessage(body) || "Failed to resend OTP");
    }

    setBrowserCookie(response);

    const successMessage = "OTP resent successfully!";

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
