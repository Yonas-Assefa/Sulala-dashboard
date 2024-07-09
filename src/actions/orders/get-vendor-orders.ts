"use server";

import { ORDERS_URL } from "@/config/urls";
import {
  Fetch,
  getRequestHeaders,
  getResponseErrorMessage,
} from "@/lib/helper";
import { ordersMapper } from "../mapper/orders-mapper";
import { getFilterSortOrdering } from "@/lib/filter-sort-ordering";

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
  console.log(ordersBody, ordersResponse);

  if (!ordersResponse.ok) {
    throw new Error(
      getResponseErrorMessage(ordersBody) || "Failed to get Orders",
    );
  }

  const data = await ordersMapper(ordersBody.data.results);
  return {
    data,
    count: ordersBody.data.count,
  };
};
