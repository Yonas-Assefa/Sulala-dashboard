"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { ANSWER_SUPPORT_REQUESTS } from "../../config/urls";
import { answerCustomerSupportSchema } from "../schema/zod-schema";
import {
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
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

    const validatedData = answerCustomerSupportSchema.parse(data);

    const response = await fetch(ANSWER_SUPPORT_REQUESTS, {
      method: "PATCH",
      headers: getRequestHeaders(),
      body: JSON.stringify(validatedData),
    });

    const body = await getResponseBody(response);

    if (!response.ok) {
      throw new Error(getResponseErrorMessage(body) || "Failed to submit form");
    }

    const successMessage = body?.message || "Success";

    const redirectUrl = "/dashboard/customer-support?filter=pending";

    revalidateTag("support-requests");

    return toFormState("SUCCESS", successMessage, redirectUrl);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
