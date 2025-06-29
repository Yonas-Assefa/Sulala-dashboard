"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { PRODUCTS } from "../../config/urls";
import { createProductSchema, updateProductSchema } from "../schema/zod-schema";
import {
  changeObjToFormData,
  getMultiPartRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "../../lib/helper";
import { revalidatePath } from "next/cache";
export const createUpdateProduct = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const dataToBeParsed = {
      title: formData.get("product_name"),
      description: formData.get("description"),
      price: +(formData.get("price") || 0),
      category: +(formData.get("category") || 0),
      inventory: +(formData.get("quantity") || 0),
      status: formData.get("status"),
      tags: formData.getAll("product_tag")?.filter(Boolean),
    };

    const tab = formData.get("tab");

    if (formData.get("brand")) {
      Object.assign(dataToBeParsed, { brand: +(formData.get("brand") || 0) });
    }

    if (formData.getAll("animal")) {
      Object.assign(dataToBeParsed, { animals: formData.getAll("animal") });
    }

    const uploadedImages = formData.getAll("uploaded_product_images");

    if (uploadedImages.length > 0) {
      Object.assign(dataToBeParsed, {
        images: uploadedImages.map((image) => image.toString()),
      });
    } else {
      const allImages = formData
        .getAll("product_images")
        ?.filter((image) => image instanceof File && image.size > 0);

      if (allImages.length > 0) {
        Object.assign(dataToBeParsed, { images: allImages });
      }
    }

    if (formData.get("weight_or_volume")) {
      const weightOrVolume = formData.get("weight_or_volume");
      const unit = formData.get("unit");
      const measureType = formData.get("measure_type")?.toString();

      if (measureType?.toLowerCase() == "weight") {
        Object.assign(dataToBeParsed, {
          weight: weightOrVolume,
          unit: unit,
        });
      } else if (measureType?.toLowerCase() == "volume") {
        Object.assign(dataToBeParsed, {
          volume: weightOrVolume,
          unit: unit,
        });
      }
    }

    if (formData.get("pieces_per_pack")) {
      Object.assign(dataToBeParsed, {
        pieces_per_pack: formData.get("pieces_per_pack"),
      });
    }

    if (formData.get("benefits")) {
      Object.assign(dataToBeParsed, {
        benefits: formData.get("benefits"),
      });
    }

    const data =
      tab == "add"
        ? createProductSchema.parse(dataToBeParsed)
        : updateProductSchema.parse({
            ...dataToBeParsed,
          });
    const item_id = +(formData.get("item") || 0);

    const URL = tab == "add" ? PRODUCTS : `${PRODUCTS}${item_id}/`;
    const METHOD = tab == "add" ? "POST" : "PATCH";
    const DATA = changeObjToFormData(data);

    const response = await fetch(URL, {
      method: METHOD,
      headers: getMultiPartRequestHeaders(),
      body: DATA,
    });

    const body = await getResponseBody(response);
    if (!response.ok) {
      throw new Error(getResponseErrorMessage(body) || "Failed to submit form");
    }

    const successMessage =
      tab == "add"
        ? "Product created successfully!"
        : "Product updated successfully!";

    const redirectUrl = "/dashboard/my-products";
    revalidatePath("/dashboard/my-products");
    if (tab == "edit") {
      revalidatePath("/dashboard/my-products/edit");
    }

    return toFormState("SUCCESS", successMessage, redirectUrl);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
