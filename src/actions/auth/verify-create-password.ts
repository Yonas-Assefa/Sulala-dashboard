"use server";
import { fromErrorToFormState, toFormState } from "@/utils/formStateHelper";
import { CONFIRM_PASSWORD_SETUP } from "../../config/urls";
import {
  getResponseBody,
  getResponseErrorMessage,
  makeRequest,
  setBrowserCookie,
} from "../../lib/helper";

type VerifyEmailArgs = {
  vendor_id: string;
  password_set_link: string;
};

export const verifyCreatepassword = async ({
  password_set_link,
  vendor_id,
}: VerifyEmailArgs) => {
  try {
    const response = await makeRequest(
      `${CONFIRM_PASSWORD_SETUP}?password_set_link=${password_set_link}&vendor_id=${vendor_id}`,
      {},
      "PATCH",
    );
    const body = await getResponseBody(response);

    if (!response.ok || !body.success) {
      const redirectUrl = "/auth/sign-in";
      const failedMessage =
        getResponseErrorMessage(body) || "Failed to verify email address";
      return toFormState("ERROR", failedMessage, redirectUrl);
    }

    setBrowserCookie(response);

    const successMessage = body.message || "Verification successful!";

    const redirectUrl = "/auth/create-password";

    return toFormState("SUCCESS", successMessage, redirectUrl);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
