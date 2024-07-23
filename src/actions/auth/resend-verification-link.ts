"use server";
import { fromErrorToFormState, toFormState } from "@/utils/formStateHelper";
import { RESEND_VERIFICATION_LINK } from "../../config/urls";
import { emailSignUpSchema } from "../schema/zod-schema";
import {
  getResponseBody,
  getResponseErrorMessage,
  makeRequest,
  setBrowserCookie,
} from "../../lib/helper";

export const resendVerificationLink = async ({ email }: { email: string }) => {
  try {
    const data = emailSignUpSchema.parse({
      email,
    });

    const response = await makeRequest(RESEND_VERIFICATION_LINK, data, "PATCH");
    setBrowserCookie(response);
    const body = await getResponseBody(response);

    if (!response.ok) {
      throw new Error(
        getResponseErrorMessage(body) || "Failed to resend verification link",
      );
    }

    const successMessage = "Verification link resent successfully!";

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
