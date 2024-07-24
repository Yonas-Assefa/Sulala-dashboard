"use server";

import { notFound } from "next/navigation";
import { GET_PENDING_DRIVERS } from "../../config/urls";
import { getRequestHeaders, getResponseBody } from "../../lib/helper";
import { getFilterSortOrdering } from "@/lib/filter-sort-ordering";
import { deliveryPartnersMapper } from "../mapper/delivery-partners-mapper";

export const getDeliveryPartners = async (formData?: FormData) => {
  const { search, page, page_size, status } = getFilterSortOrdering(formData);

  const query = new URLSearchParams();
  if (page) {
    query.append("page", page?.toString());
  }

  if (page_size) {
    query.append("page_size", page_size?.toString());
  }

  if (search) {
    query.append("search", search?.toString());
  }

  if (status && status !== "all") {
    switch (status?.toString()?.toLowerCase()) {
      case "online":
        query.append("is_active", "true");
        break;
      case "offline":
        query.append("is_active", "false");
        break;
      case "assigned":
        query.append("is_assigned", "true");
        break;
      case "free":
        query.append("is_assigned", "false");
        break;
      default:
        break;
    }
  }

  const URL = `${GET_PENDING_DRIVERS}?${query?.toString()}`;

  const response = await fetch(URL, {
    method: "GET",
    headers: getRequestHeaders(),
    next: {
      tags: ["delivery-partners"],
    },
  });
  const body = await getResponseBody(response);

  if (!response.ok || !body.data) {
    throw new Error(body.message || "Failed to get delivery partners");
  }

  return {
    count: body.data?.count,
    data: await deliveryPartnersMapper(body.data?.results),
  };
};

export const getOneDeliveryPartner = async (driver_id: string) => {
  const response = await fetch(`${GET_PENDING_DRIVERS}${driver_id}/`, {
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
    throw new Error(body.message || "Failed to get delivery partner details");
  }

  return deliveryPartnersMapper(body.data);
};
