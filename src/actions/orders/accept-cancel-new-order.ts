"use server";

import { ACCEPT_DECLINE_ORDER } from "@/config/urls";
import {
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "@/lib/helper";
import { FormState, toFormState } from "@/utils/formStateHelper";
import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";

export const acceptCancelOrder = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    console.log(
      "am called here: now the order status is: ",
      formData.get("id"),
      formData.get("status"),
    );
    revalidateTag("order-item");

    return toFormState("SUCCESS", "Order status updated", "/auth/sign-in/");
  } catch (error) {
    return toFormState("SUCCESS", "Order status updated", "/auth/sign-in/");
  }
};
