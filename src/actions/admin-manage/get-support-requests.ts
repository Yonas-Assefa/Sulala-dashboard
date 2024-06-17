"use server";

import { notFound } from "next/navigation";
import { GET_SUPPORT_REQUESTS } from "../../config/urls";
import { getRequestHeaders, getResponseBody } from "../../lib/helper";
import { manageCustomerSupport } from "../mapper/manage-customer-support";

export const getSupportRequests = async (formData: FormData) => {
  const response = await fetch(`${GET_SUPPORT_REQUESTS}`, {
    method: "GET",
    headers: getRequestHeaders(),
    next: {
      tags: ["support-requests"],
    },
  });
  const body = await getResponseBody(response);

  if (!response.ok || !body.results) {
    throw new Error(body.message || "Failed to get customer support requests");
  }

  return manageCustomerSupport(body.results);
};

export const getOnePendingShop = async (vendor_id: string) => {
  const response = await fetch(`${GET_SUPPORT_REQUESTS}`, {
    method: "GET",
    headers: getRequestHeaders(),
    next: {
      tags: ["support-requests"],
    },
  });
  const body = await getResponseBody(response);

  if (!response.ok || !body.results) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(body.message || "Failed to get customer support requests");
  }

  return manageCustomerSupport(
    body.results?.find((vendor: any) => vendor.id == vendor_id),
  );
};
