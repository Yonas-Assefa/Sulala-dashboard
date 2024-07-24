"use server";
import {
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "@/lib/helper";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { revalidateTag } from "next/cache";
import { ORDERS } from "@/config/urls";
import { notFound } from "next/navigation";

export const acceptCancelOrder = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const data = {
      status: formData.get("status"),
    };

    const response = await fetch(
      `${ORDERS}${formData.get("vendor_id")}/order-confirm/`,
      {
        method: "PATCH",
        headers: getRequestHeaders(),
        body: JSON.stringify(data),
      },
    );

    const body = await getResponseBody(response);

    if (!response.ok) {
      throw new Error(getResponseErrorMessage(body) || "Failed to submit form");
    }

    const successMessage = body.message || "Success";

    // const redirectUrl = /dashboard/dashboard/orders/items/detail?item=163&type=product";

    revalidateTag(`order-${formData.get("vendor_id")}`);

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
