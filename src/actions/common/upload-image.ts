"use server";

import { UPLOAD_IMAGE } from "@/config/urls";
import { uploadImageSchema } from "../schema/zod-schema";
import {
  changeObjToFormData,
  getMultiPartRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "@/lib/helper";

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

    const data = uploadImageSchema.parse({ file });

    const response = await fetch(UPLOAD_IMAGE, {
      method: "POST",
      headers: getMultiPartRequestHeaders(),
      body: changeObjToFormData(data),
    });

    const body = await getResponseBody(response);
    if (!response.ok || !body?.success) {
      throw new Error(
        getResponseErrorMessage(body) || "Failed to upload image",
      );
    }

    const successMessage = "Image uploaded successful!";

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error as Error);
  }
};
