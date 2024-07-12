"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { BILLING_INFO } from "../../config/urls";
import { billingInfoSettingSchema } from "../schema/zod-schema";
import {
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "../../lib/helper";
import { revalidatePath } from "next/cache";
import cache from "@/cache/node-cache";
import { revalidateCachedPersonalInfo } from "@/cache/get-cached-personal-info";

export const createBillingInfo = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const data = billingInfoSettingSchema.parse({
      account_holder_name: formData.get("card_holder_name"),
      card_number: formData.get("card_number"),
      expiration_date: formData.get("expiry_date"),
      cvc: formData.get("cvc"),
    });

    const response = await fetch(BILLING_INFO, {
      method: "POST",
      headers: getRequestHeaders(),
      body: JSON.stringify(data),
    });

    const body = await getResponseBody(response);
    if (!response.ok) {
      throw new Error(getResponseErrorMessage(body) || "Failed to submit form");
    }

    await revalidateCachedPersonalInfo();

    const successMessage = body.message || "Successfully updated billing info";

    revalidatePath("/dashboard/settings/billing-info");

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
