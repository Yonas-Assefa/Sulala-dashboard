"use server";
import { fromErrorToFormState, toFormState } from "@/utils/formStateHelper";
import { PRODUCTS } from "../../config/urls";
import {
  changeObjToFormData,
  getMultiPartRequestHeaders,
} from "../../lib/helper";
import { revalidatePath } from "next/cache";

export const deleteProductImage = async (formData: FormData) => {
  try {
    const item_id = +(formData.get("item_id") || 0);
    const image = formData.get("image");

    if (!item_id) {
      throw new Error("Invalid product id");
    }

    if (!image) {
      throw new Error("Invalid image");
    }

    const URL = `${PRODUCTS}${item_id}/delete-image/`;
    const METHOD = "DELETE";

    const response = await fetch(URL, {
      method: METHOD,
      headers: getMultiPartRequestHeaders(),
      body: changeObjToFormData({ image }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    const successMessage = "Product image deleted successfully!";

    revalidatePath(`product-${item_id}`);

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
