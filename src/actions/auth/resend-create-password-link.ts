"use server";
import { fromErrorToFormState, toFormState } from "@/utils/formStateHelper";
import { RESEND_PASSWORD_SETUP_LINK } from "../../config/urls";
import { emailSignUpSchema } from "../schema/zod-schema";

import {
  getResponseBody,
  getResponseErrorMessage,
  makeRequest,
} from "../../lib/helper";

export const resendCreatePasswordLink = async ({
  email,
}: {
  email: string;
}) => {
  try {
    const data = emailSignUpSchema.parse({
      email,
    });

    const response = await makeRequest(
      RESEND_PASSWORD_SETUP_LINK,
      data,
      "POST",
    );

    const body = await getResponseBody(response);

    if (!response.ok || !body.success) {
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
