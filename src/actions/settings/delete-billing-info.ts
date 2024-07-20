"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { BILLING_INFO } from "../../config/urls";
import { getRequestHeaders, getResponseErrorMessage } from "../../lib/helper";
import { revalidateTag } from "next/cache";
import cache from "@/cache/node-cache";
import { revalidateCachedPersonalInfo } from "@/cache/get-cached-personal-info";

export const deleteBillingInfo = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const billing_id = formData.get("billing_id");

    if (!billing_id) {
      throw new Error("Billing id is required");
    }

    if (isNaN(Number(billing_id))) {
      throw new Error("Invalid billing id");
    }

    const response = await fetch(`${BILLING_INFO}${billing_id}/`, {
      method: "DELETE",
      headers: getRequestHeaders(),
    });

    if (!response.ok) {
      const body = await response.json();
      throw new Error(getResponseErrorMessage(body) || "Failed to submit form");
    }

    await revalidateCachedPersonalInfo();

    const successMessage = "Successfully deleted payment method";

    revalidateTag("billing");

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
