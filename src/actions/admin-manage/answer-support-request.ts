"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import {
  ANSWER_SUPPORT_REQUESTS,
  APPROVE_SHOPS,
  CONFIRM_PHONE,
  REJECT_SHOPS,
  VERIFY_PHONE,
} from "../../config/urls";
import { approveRejectShopsSchema } from "../schema/zod-schema";
import { cookies } from "next/headers";
import {
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
  makeRequest,
  setBrowserCookie,
} from "../../lib/helper";
import { revalidateTag } from "next/cache";

export const answerSupportRequest = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const data = {
      response: formData.get("response"),
      id: formData.get("id"),
    };

    const validatedData = approveRejectShopsSchema.parse(data);

    const response = await fetch(ANSWER_SUPPORT_REQUESTS, {
      method: "PATCH",
      headers: getRequestHeaders(),
      body: JSON.stringify(validatedData),
    });

    const body = await getResponseBody(response);

    if (!response.ok || !body.success) {
      throw new Error(getResponseErrorMessage(body) || "Failed to submit form");
    }

    setBrowserCookie(response);

    const successMessage = body.message || "Success";

    const redirectUrl = "/dashboard/customer-support?filter=pending";

    revalidateTag("customer-support");

    return toFormState("SUCCESS", successMessage, redirectUrl);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
