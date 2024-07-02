"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { CONFIRM_RESET_PASSWORD } from "../../config/urls";
import { createPasswordSchema } from "../schema/zod-schema";
import {
  getResponseBody,
  getResponseErrorMessage,
  setBrowserCookie,
} from "../../lib/helper";

export const resetPassword = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const data = createPasswordSchema.parse({
      password: formData.get("password"),
      confirm_password: formData.get("password_confirm"),
    });

    const vendor_id = formData.get("vendor_id");
    const reset_link = formData.get("reset_link");

    const URL = `${CONFIRM_RESET_PASSWORD}?vendor_id=${vendor_id}&reset_link=${reset_link}`;

    const response = await fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        new_password: data.password,
        confirm_password: data.confirm_password,
      }),
    });

    const body = await getResponseBody(response);
    if (!response.ok) {
      throw new Error(getResponseErrorMessage(body) || "Failed to submit form");
    }

    const successMessage = body.message || "Password reset successfully";
    const redirectUrl = "/auth/sign-in?by=email";

    return toFormState("SUCCESS", successMessage, redirectUrl);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
