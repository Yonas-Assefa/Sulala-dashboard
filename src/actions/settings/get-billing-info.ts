"use server";

import { GET_BILLING_ACCOUNT } from "../../config/urls";
import { billingMapper } from "../mapper/billing-mapper";
import { getRequestHeaders, getResponseBody } from "../../lib/helper";

export const getBillingInfo = async () => {
  const response = await fetch(GET_BILLING_ACCOUNT, {
    method: "GET",
    headers: getRequestHeaders(),
    next: {
      tags: ["billing"],
    },
  });
  const body = await getResponseBody(response);

  if (!response.ok) {
    throw new Error(body.message || "Failed to get billing info");
  }

  return billingMapper(body.data);
};
