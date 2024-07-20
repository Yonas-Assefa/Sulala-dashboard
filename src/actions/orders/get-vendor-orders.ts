"use server";

import { ORDERS, ORDERS_URL } from "@/config/urls";
import {
  Fetch,
  getRequestHeaders,
  getResponseErrorMessage,
} from "@/lib/helper";
import { orderDetailMapper, ordersMapper } from "../mapper/orders-mapper";
import { getFilterSortOrdering } from "@/lib/table";
import { getResponseBody } from "@/lib/helper";
import { notFound } from "next/navigation";

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

export const getSingleOrder = async (item: string) => {
  const url = `http://34.18.54.116:3001/api/v1/orders/${item}/vendor-detail-order/`;
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
