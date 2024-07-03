"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { APPROVE_SHOPS, REJECT_SHOPS } from "../../config/urls";
import { approveRejectShopsSchema } from "../schema/zod-schema";
import {
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "../../lib/helper";
import { revalidateTag } from "next/cache";

export const approveReject = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const data = {
      status: formData.get("status"),
    };

    if (data.status == "REJECT") {
      Object.assign(data, { reason: formData.get("reason") });
    }

    const validatedData = approveRejectShopsSchema.parse(data);

    const URL = data.status == "APPROVE" ? APPROVE_SHOPS : REJECT_SHOPS;

    const { status, ...dataToSend } = validatedData;

    Object.assign(dataToSend, { id: formData.get("vendor_id") });

    const response = await fetch(URL, {
      method: "PATCH",
      headers: getRequestHeaders(),
      body: JSON.stringify(dataToSend),
    });

    const body = await getResponseBody(response);

    if (!response.ok) {
      throw new Error(getResponseErrorMessage(body) || "Failed to submit form");
    }

    const successMessage = body.message || "Success";

    const redirectUrl = "/dashboard/shops?filter=pending";

    revalidateTag("pending-shops");

    return toFormState("SUCCESS", successMessage, redirectUrl);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
