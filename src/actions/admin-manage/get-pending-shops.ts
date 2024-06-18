"use server";

import { notFound } from "next/navigation";
import { GET_PENDING_SHOPS } from "../../config/urls";
import { getRequestHeaders, getResponseBody } from "../../lib/helper";
import { manageShopsMapper } from "../mapper/manage-shop-mapper";

export const getPendingShops = async (formData: FormData) => {
  const response = await fetch(`${GET_PENDING_SHOPS}`, {
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

  return manageShopsMapper(body.data);
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
    body.data?.find((vendor: any) => vendor.id == vendor_id),
  );
};
