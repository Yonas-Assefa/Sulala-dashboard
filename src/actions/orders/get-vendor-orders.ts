"use server";

import { ORDERS_URL, ORDERS } from "@/config/urls";
import {
  Fetch,
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "@/lib/helper";
import { orderDetailMapper, ordersMapper } from "../mapper/orders-mapper";
import { getFilterSortOrdering } from "@/lib/filter-sort-ordering";
import { notFound } from "next/navigation";

export const getOrders = async (formData: FormData) => {
  const { search, status, ordering, page, page_size } = getFilterSortOrdering(
    "order",
    formData,
  );
  const ordersResponse = await Fetch({
    url: ORDERS_URL,
    method: "GET",
    headers: getRequestHeaders(),
    params: {
      search,
      vendor_status: status,
      ordering,
      page,
      page_size,
    },
  });
  const ordersBody = await ordersResponse.json();

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

export const getSingleOrder = async (item: string) => {
  const url = `${ORDERS}${item}/vendor-detail-order/`;
  const response = await fetch(url, {
    method: "GET",
    headers: getRequestHeaders(),
    next: {
      tags: [`order-${item}`],
    },
  });

  const body = await getResponseBody(response);

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(
      getResponseErrorMessage(body) || "Failed to get order detail",
    );
  }

  const modifiedOrderDetail = await orderDetailMapper(body.data);

  return modifiedOrderDetail;
};
