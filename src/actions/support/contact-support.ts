"use server";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/formStateHelper";
import { CONTACT_SUPPORT } from "../../config/urls";
import { contactSupportSchema } from "../schema/zod-schema";
import { getResponseBody, getResponseErrorMessage } from "../../lib/helper";

export const contactSupport = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const data = contactSupportSchema.parse({
      email: formData.get("email"),
      message: formData.get("message"),
      full_name: formData.get("full_name"),
    });

    const response = await fetch(CONTACT_SUPPORT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body = await getResponseBody(response);
    if (!response.ok) {
      throw new Error(getResponseErrorMessage(body) || "Failed to submit form");
    }

    const successMessage = "Contact form submitted successfully.";

    return toFormState("SUCCESS", successMessage);
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
