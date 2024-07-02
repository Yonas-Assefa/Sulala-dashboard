"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { UPDATE_SHOP_ACCOUNT } from "../../config/urls";
import { shopInfoSettingSchema } from "../schema/zod-schema";
import {
  changeObjToFormData,
  getMultiPartRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
  removeNullAndUndefined,
} from "../../lib/helper";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateShopInfo = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const cleanedData = removeNullAndUndefined({
      name: formData.get("shop_name"),
      description: formData.get("description"),
      categories: formData.getAll("categories").map((category) => +category),
      legal_address: formData.get("legal_address"),
      website: formData.get("website"),
      instagram: formData.get("instagram"),
      facebook: formData.get("facebook"),
      profile_photo: formData.get("profile_image"),
    });

    const data = shopInfoSettingSchema.parse(cleanedData);
    const response = await fetch(UPDATE_SHOP_ACCOUNT, {
      method: "PATCH",
      headers: getMultiPartRequestHeaders(),
      body: changeObjToFormData(data),
    });

    const body = await getResponseBody(response);
    if (!response.ok) {
      throw new Error(getResponseErrorMessage(body) || "Failed to submit form");
    }

    const successMessage = body.message || "Successfully updated shop info";

    revalidatePath("/dashboard/settings");
    revalidateTag("shop-info-detail");

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
