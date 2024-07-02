"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { PROMOTIONS } from "../../config/urls";
import {
  changeObjToFormData,
  getMultiPartRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "../../lib/helper";
import { revalidatePath } from "next/cache";

export const updatePromotionStatus = async (formData: FormData) => {
  try {
    const status = formData.get("status");
    const item_id = formData.get("item_id");
    const newStatus = status == "ACTIVE" ? "PAUSED" : "ACTIVE";

    const data = {
      status: newStatus,
    };

    const response = await fetch(`${PROMOTIONS}${item_id}/`, {
      method: "PATCH",
      headers: getMultiPartRequestHeaders(),
      body: changeObjToFormData(data),
    });

    const body = await getResponseBody(response);
    if (!response.ok) {
      throw new Error(getResponseErrorMessage(body) || "Failed to submit form");
    }

    const successMessage = `Promotion status set to ${newStatus.toLowerCase()} successfully`;

    revalidatePath("/dashboard/promotion");

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
