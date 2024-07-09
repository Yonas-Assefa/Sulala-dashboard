"use server";
import { fromErrorToFormState, toFormState } from "@/utils/formStateHelper";
import { PROMOTIONS } from "../../config/urls";
import { getMultiPartRequestHeaders } from "../../lib/helper";
import { revalidatePath } from "next/cache";

export const deletePromotion = async (formData: FormData) => {
  try {
    const item_id = formData.get("item_id");

    const response = await fetch(`${PROMOTIONS}${item_id}/`, {
      method: "DELETE",
      headers: getMultiPartRequestHeaders(),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Promotion not found");
      }
      throw new Error("Failed to submit form");
    }

    const successMessage = `Promotion deleted successfully`;

    revalidatePath("/dashboard/promotion");

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
