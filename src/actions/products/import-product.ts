"use server";

import { PRODUCTS_IMPORT } from "@/config/urls";
import { importProductsSchema } from "../schema/zod-schema";
import { fromErrorToFormState, toFormState } from "@/utils/formStateHelper";
import {
  changeObjToFormData,
  getMultiPartRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "@/lib/helper";
import { revalidatePath } from "next/cache";

export const importProduct = async (formData?: FormData) => {
  try {
    const csv_file = formData?.get("csv_file");

    const result = importProductsSchema.parse({ csv_file });

    const response = await fetch(PRODUCTS_IMPORT, {
      method: "POST",
      headers: getMultiPartRequestHeaders(),
      body: changeObjToFormData(result),
    });

    const body = await getResponseBody(response);
    if (!response.ok) {
      throw new Error(getResponseErrorMessage(body) || "Failed to submit form");
    }

    const successMessage = "Product imported successfully!";

    revalidatePath("/dashboard/my-products");

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
