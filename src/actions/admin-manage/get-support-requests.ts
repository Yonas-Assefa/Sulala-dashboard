"use server";

import { notFound } from "next/navigation";
import { GET_SUPPORT_REQUESTS } from "../../config/urls";
import {
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "../../lib/helper";
import { manageCustomerSupport } from "../mapper/manage-customer-support-mapper";
import { getFilterSortOrdering } from "@/lib/filter-sort-ordering";

export const getSupportRequests = async (formData: FormData) => {
  const { status, search } = getFilterSortOrdering(formData);

  const query = new URLSearchParams();
  if (status && status.toLowerCase() !== "all") {
    query.append(
      "answered",
      status?.toString().toLowerCase() == "answered" ? "true" : "false",
    );
  }

  if (search) {
    query.append("search", search?.toString());
  }

  const URL = `${GET_SUPPORT_REQUESTS}?${query.toString()}`;

  const response = await fetch(`${URL}`, {
    method: "GET",
    headers: getRequestHeaders(),
    next: {
      tags: ["support-requests"],
    },
  });
  const body = await getResponseBody(response);

  if (!response.ok) {
    throw new Error(
      getResponseErrorMessage(body) ||
        "Failed to get customer support requests",
    );
  }

  return manageCustomerSupport(body.data?.results);
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

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(
      getResponseErrorMessage(body) ||
        "Failed to get customer support requests",
    );
  }

  return manageCustomerSupport(
    body.data?.results?.find((vendor: any) => vendor.id == vendor_id),
  );
};
