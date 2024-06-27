"use server";

import { PRODUCTS_IMPORT } from "@/config/urls";
import { importProductsSchema } from "../schema/zod-schema";
import {
  changeObjToFormData,
  getMultiPartRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "@/lib/helper";
import { revalidatePath } from "next/cache";

type uploadImageResponse = {
  success: boolean;
  message: string;
};

const toFormState = (status: string, message: string): uploadImageResponse => {
  return {
    success: status === "SUCCESS",
    message,
  };
};

const fromErrorToFormState = (error: Error): uploadImageResponse => {
  return {
    success: false,
    message: error.message,
  };
};

export const uploadImage = async (
  formData?: FormData,
): Promise<uploadImageResponse> => {
  try {
    const file = formData?.get("file");

    const response = await fetch(PRODUCTS_IMPORT, {
      method: "POST",
      headers: getMultiPartRequestHeaders(),
      body: changeObjToFormData({ file }),
    });

    const body = await getResponseBody(response);
    if (!response.ok || !body?.success) {
      throw new Error(
        getResponseErrorMessage(body) || "Failed to upload image",
      );
    }

    const successMessage = "Image uploaded successful!";

    revalidatePath("/dashboard/my-products");

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error as Error);
  }
};
