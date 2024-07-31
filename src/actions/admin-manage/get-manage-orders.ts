"use server";

import { GET_ORDERS_VIEW_URL } from "@/config/urls";
import {
  Fetch,
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "@/lib/helper";
import { getFilterSortOrdering } from "@/lib/filter-sort-ordering";
import { notFound } from "next/navigation";
import {
  manageOrderDetailMapper,
  manageOrdersMapper,
} from "../mapper/manage-orders-mapper";

export const getManageOrders = async (formData: FormData) => {
  const { search, status, ordering, page, page_size } = getFilterSortOrdering(
    undefined,
    formData,
  );

  const ordersResponse = await Fetch({
    url: GET_ORDERS_VIEW_URL,
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

  if (!ordersResponse.ok) {
    throw new Error(
      getResponseErrorMessage(ordersBody) || "Failed to get Orders",
    );
  }

  const data = await manageOrdersMapper(ordersBody.data.results);
  return {
    data,
    count: ordersBody.data.count,
  };
};

export const getSingleManageOrder = async (item: string) => {
  const response = await fetch(GET_ORDERS_VIEW_URL, {
    method: "GET",
    headers: getRequestHeaders(),
    next: {
      tags: [`manage-order-${item}`],
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

  const modifiedOrderDetail = await manageOrderDetailMapper(
    body.data.results,
    item,
  );

  return modifiedOrderDetail;
};
