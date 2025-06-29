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
import { revalidatePath, revalidateTag } from "next/cache";
import { updatePromoStatus } from "../schema/zod-schema";

export const updatePromotionStatus = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const status = formData.get("status");
    const item_id = formData.get("item_id");
    const newStatus = status == "ACTIVE" ? "PAUSED" : "ACTIVE";

    const data = {
      status: newStatus,
    };

    if (newStatus == "ACTIVE") {
      const start_date = new Date().toISOString();
      const end_date = formData.get("end_datetime");
      Object.assign(data, { start_date, end_date });
    }

    const parsedData = updatePromoStatus.parse(data);

    const response = await fetch(`${PROMOTIONS}${item_id}/`, {
      method: "PATCH",
      headers: getMultiPartRequestHeaders(),
      body: changeObjToFormData(parsedData),
    });

    const body = await getResponseBody(response);
    if (!response.ok) {
      throw new Error(getResponseErrorMessage(body) || "Failed to submit form");
    }

    const successMessage = `Promotion status set to ${newStatus.toLowerCase()} successfully`;

    // revalidatePath("/dashboard/promotion");
    revalidateTag("promotions");

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
