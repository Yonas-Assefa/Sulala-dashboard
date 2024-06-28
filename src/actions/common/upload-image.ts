"use server";

import { UPLOAD_IMAGE } from "@/config/urls";
import { uploadImageSchema } from "../schema/zod-schema";
import {
  changeObjToFormData,
  getMultiPartRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "@/lib/helper";
import { getoneFromArray } from "@/utils/getOneFromArray";
import { constructImageUrl } from "@/lib/images";

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
    const image = formData?.get("file");

    const data = uploadImageSchema.parse({ image });

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

    const message = getoneFromArray(body.data);

    return toFormState("SUCCESS", message);
  } catch (error) {
    return fromErrorToFormState(error as Error);
  }
};
