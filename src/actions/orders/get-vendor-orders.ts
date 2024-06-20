"use server";

import { ORDERS_URL } from "@/config/urls";
import { Fetch, getRequestHeaders } from "@/lib/helper";
import { ordersMapper } from "../mapper/orders-mapper";
import { getFilterSortOrdering } from "@/lib/table";

export const getOrders = async (formData: FormData) => {
  const { search, status, ordering, page, page_size } =
    getFilterSortOrdering(formData);
  const ordersResponse = await Fetch({
    url: ORDERS_URL,
    method: "GET",
    headers: getRequestHeaders(),
    params: {
      search,
      status,
      ordering,
      page,
      page_size,
    },
  });
  const ordersBody = await ordersResponse.json();
  if (!ordersResponse.ok || !ordersBody.data) {
    throw new Error(ordersBody.message || "Failed to get Orders");
  }

  return await ordersMapper(ordersBody.data);
};
