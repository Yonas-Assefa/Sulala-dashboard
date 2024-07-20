"use server";

import { toFormState } from "@/utils/formStateHelper";
import { UPDATE_SHOP_ACCOUNT } from "../../config/urls";
import {
  getMultiPartRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "../../lib/helper";
import { revalidatePath } from "next/cache";
import cache from "@/cache/node-cache";
import { revalidateCachedPersonalInfo } from "@/cache/get-cached-personal-info";

export const deleteShopProfile = async (formData: FormData) => {
  const response = await fetch(UPDATE_SHOP_ACCOUNT, {
    method: "PATCH",
    headers: getMultiPartRequestHeaders(),
    body: formData,
  });
  const body = await getResponseBody(response);

  if (!response.ok) {
    throw new Error(
      getResponseErrorMessage(body) || "Failed to delete shop profile",
    );
  }

  await revalidateCachedPersonalInfo();

  revalidatePath("/dashboard/settings/shop-info");

  return toFormState("SUCCESS", "Successfully deleted shop profile");
};
