"use server";

import { notFound } from "next/navigation";
import { PRODUCT_TAGS } from "../../config/urls";
import {
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "../../lib/helper";

export const getProductTags = async () => {
  const response = await fetch(PRODUCT_TAGS, {
    method: "GET",
    headers: getRequestHeaders(),
  });
  const body = await getResponseBody(response);

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(getResponseErrorMessage(body) || "Failed to resend OTP");
  }

  return body.data?.results?.map((tag: any) => {
    return {
      label: tag.name,
      value: tag.id,
    };
  });
};
