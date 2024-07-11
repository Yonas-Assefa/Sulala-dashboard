"use server";

import { notFound } from "next/navigation";
import { GET_PENDING_DRIVERS } from "../../config/urls";
import { getRequestHeaders, getResponseBody } from "../../lib/helper";
import { manageShopsMapper } from "../mapper/manage-shop-mapper";
import { manageDriversMapper } from "../mapper/manage-driver-mapper";

export const getPendingDrivers = async (formData: FormData) => {
  const response = await fetch(`${GET_PENDING_DRIVERS}`, {
    method: "GET",
    headers: getRequestHeaders(),
    next: {
      tags: ["pending-drivers"],
    },
  });
  const body = await getResponseBody(response);

  if (!response.ok || !body.data) {
    throw new Error(body.message || "Failed to get pending drivers");
  }

  return manageDriversMapper(body.data?.results);
};

export const getOnePendingDriver = async (vendor_id: string) => {
  const response = await fetch(`${GET_PENDING_DRIVERS}`, {
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

  return manageDriversMapper(
    body.data?.find((vendor: any) => vendor.id == vendor_id),
  );
};
