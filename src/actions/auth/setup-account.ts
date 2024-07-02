"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { SETUP_URL, SHOP_ACCOUNT } from "../../config/urls";
import {
  setupAccountFirstStepSchema,
  setupAccountLastStepSchema,
} from "../schema/zod-schema";
import {
  changeObjToFormData,
  getMultiPartRequestHeaders,
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
  removeNullAndUndefined,
} from "../../lib/helper";
import { redirect } from "@/i18n/navigation";

export const setupAccount = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const stage = formData.get("stage")?.toString();

    if (stage === "two") {
      return toFormState(
        "INFO",
        "Account setup 2/3",
        "/auth/setup-account?stage=three",
      );
    }

    const data: { phone_number?: string; email?: string } = {};

    if (stage == "one") {
      const ZodObj = setupAccountFirstStepSchema.parse({
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
      });
      Object.assign(data, { ...ZodObj });
    } else {
      const cleanedData = removeNullAndUndefined({
        name: formData.get("company_name"),
        categories: formData
          .getAll("sale_category")
          .map((category) => +category),
        legal_address: formData.get("address"),
        certificates: formData.get("certificate"),
        tax_forms: formData.get("tax_form"),
        profile_photo: formData.get("profile_image"),
      });
      const ZodObj = setupAccountLastStepSchema.parse(cleanedData);
      Object.assign(data, { ...ZodObj });
    }

    const response =
      stage == "one"
        ? await fetch(SETUP_URL, {
            method: "PATCH",
            headers: getRequestHeaders(),
            body: JSON.stringify(data),
          })
        : await fetch(SHOP_ACCOUNT, {
            method: "POST",
            headers: getMultiPartRequestHeaders(),
            body: changeObjToFormData(data),
          });
    const body = await getResponseBody(response);
    if (!response.ok) {
      throw new Error(getResponseErrorMessage(body) || "Failed to submit form");
    }

    const successMessage =
      stage == "one" ? "Account setup 1/3" : "Account setup 3/3";

    const redirectUrl = body?.message
      ?.toLowerCase()
      .includes("please verify the new email address")
      ? `/auth/confirm-letter?email=${encodeURIComponent(data.email!)}`
      : stage !== "three"
        ? `/auth/setup-account?stage=${encodeURIComponent(stage == "one" ? "two" : "three")}`
        : `/auth/setup-complete?email=${encodeURIComponent(formData.get("email")?.toString()!)}`;

    return toFormState("INFO", successMessage, redirectUrl);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
