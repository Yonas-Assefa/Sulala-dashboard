"use server";
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
  const ACCEPT_DECLINE_ORDER = `http://34.18.54.116:3001/api/v1/orders/${formData.get("id")}/`;
  try {
    revalidateTag("order-item");

    return toFormState("SUCCESS", "Order status updated", "/auth/sign-in/");
  } catch (error) {
    return toFormState("SUCCESS", "Order status updated", "/auth/sign-in/");
  }
};
