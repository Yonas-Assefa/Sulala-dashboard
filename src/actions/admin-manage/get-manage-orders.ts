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
import { manageOrdersMapper } from "../mapper/manage-orders-mapper";

export const getManageOrders = async (formData: FormData) => {
  const { search, status, ordering, page, page_size } =
    getFilterSortOrdering(formData);
  console.log({ GET_ORDERS_VIEW_URL });
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

export const getSingleOrder = async (
  item: string,
  page: string,
  page_size: string,
) => {
  const query = new URLSearchParams();

  if (page) {
    query.append("page", page);
  }

  if (page_size) {
    query.append("page_size", page_size);
  }
  const url = `${GET_ORDERS_VIEW_URL}/?${query.toString()}`;
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

  const modifiedOrderDetail = await manageOrdersMapper(
    body.data?.results.find((order: any) => order.id == item),
  );

  return modifiedOrderDetail;
};
