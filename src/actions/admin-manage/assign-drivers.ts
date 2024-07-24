"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { ASSING_DRIVERS_URL } from "../../config/urls";
import {
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "../../lib/helper";
import { revalidateTag } from "next/cache";
import { assignDriverSchema } from "../schema/zod-schema";

export const assignOrder = async (formState: FormState, formData: FormData) => {
  try {
    const order_id = formData.get("order_id")?.toString();
    const driver_id = formData.get("driver_id")?.toString();
    const shop_id = formData.get("shop_id")?.toString();

    const data = assignDriverSchema.parse({
      order_id,
      driver_id,
      shop_id,
    });

    const response = await fetch(ASSING_DRIVERS_URL, {
      method: "PATCH",
      headers: getRequestHeaders(),
      body: JSON.stringify(data),
    });

    const body = await getResponseBody(response);
    console.log({ body });

    if (!response.ok) {
      throw new Error(getResponseErrorMessage(body) || "Failed to submit form");
    }

    const successMessage = body.message || "Success";

    const redirectUrl = "/dashboard/manage-orders/items?filter=all";

    revalidateTag("pending-drivers");

    return toFormState("SUCCESS", successMessage, redirectUrl);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
