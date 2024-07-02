"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { FORGOT_PASSWORD } from "../../config/urls";
import { emailSignUpSchema } from "../schema/zod-schema";
import { getResponseBody, getResponseErrorMessage } from "../../lib/helper";

export const forgotPassword = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const data = emailSignUpSchema.parse({
      email: formData.get("email"),
    });

    const response = await fetch(FORGOT_PASSWORD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body = await getResponseBody(response);
    if (!response.ok) {
      throw new Error(getResponseErrorMessage(body) || "Failed to submit form");
    }

    const successMessage =
      body.message || "Check your email for the reset link";

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
