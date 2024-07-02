"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { DELETE_BILLING_INFO } from "../../config/urls";
import { getRequestHeaders } from "../../lib/helper";
import { revalidateTag } from "next/cache";

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

    const response = await fetch(DELETE_BILLING_INFO, {
      method: "DELETE",
      headers: getRequestHeaders(),
      body: JSON.stringify({
        id: Number(billing_id),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }
    const successMessage = "Successfully deleted payment method";

    revalidateTag("billing");

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
