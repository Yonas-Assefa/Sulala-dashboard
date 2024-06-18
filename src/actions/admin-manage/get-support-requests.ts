"use server";

import { notFound } from "next/navigation";
import { GET_SUPPORT_REQUESTS } from "../../config/urls";
import { getRequestHeaders, getResponseBody } from "../../lib/helper";
import { manageCustomerSupport } from "../mapper/manage-customer-support-mapper";
import { getFilterSortOrdering } from "@/lib/table";

export const getSupportRequests = async (formData: FormData) => {
  const { status } = getFilterSortOrdering(formData);

  const query = new URLSearchParams();
  query.append(
    "answered",
    status.toLowerCase() == "answered" ? "true" : "false",
  );

  const URL =
    !status || status.toLowerCase() == "all"
      ? GET_SUPPORT_REQUESTS
      : `${GET_SUPPORT_REQUESTS}?${query.toString()}`;

  const response = await fetch(`${URL}`, {
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

export const getOneCustomerRequest = async (vendor_id: string) => {
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
