"use server";

import { notFound } from "next/navigation";
import { GET_PENDING_SHOPS } from "../../config/urls";
import { getRequestHeaders, getResponseBody } from "../../lib/helper";
import { manageShopsMapper } from "../mapper/manage-shop-mapper";
import { getFilterSortOrdering } from "@/lib/filter-sort-ordering";

export const getPendingShops = async (formData: FormData) => {
  const { status, search, page, page_size } = getFilterSortOrdering(formData);

  const query = new URLSearchParams();
  query.append("page", page?.toString());
  query.append("page_size", page_size?.toString());

  if (status) {
    switch (status?.toString()?.toLowerCase()) {
      case "approved":
        query.append("is_rejected", "false");
        query.append("has_onboarded", "true");
        break;
      case "rejected":
        query.append("is_rejected", "true");
        break;
      case "pending":
        query.append("has_onboarded", "false");
        query.append("is_rejected", "false");
        break;
      default:
        break;
    }
  }

  if (search) {
    query.append("search", search?.toString());
  }

  const URL = `${GET_PENDING_SHOPS}?${query?.toString()}`;
  const response = await fetch(URL, {
    method: "GET",
    headers: getRequestHeaders(),
    next: {
      tags: ["pending-shops"],
    },
  });
  const body = await getResponseBody(response);

  if (!response.ok || !body.data) {
    throw new Error(body.message || "Failed to get pending shops");
  }

  const data = await manageShopsMapper(body.data?.results);

  return {
    data,
    count: body.data?.count,
  };
};

export const getOnePendingShop = async (vendor_id: string) => {
  const response = await fetch(`${GET_PENDING_SHOPS}`, {
    method: "GET",
    headers: getRequestHeaders(),
    next: {
      tags: ["pending-shops"],
    },
  });
  const body = await getResponseBody(response);

  if (!response.ok || !body.data) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(body.message || "Failed to get pending shops");
  }

  return manageShopsMapper(
    body.data?.results?.find((vendor: any) => vendor.id == vendor_id),
  );
};
