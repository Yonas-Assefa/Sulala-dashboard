"use server";

import { PRODUCTS } from "../../config/urls";
import { productMapper } from "../mapper/product-mapper";
import {
  Fetch,
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "../../lib/helper";
import { notFound } from "next/navigation";
import { getFilterSortOrdering } from "@/lib/table";

export const getProducts = async (formData?: FormData) => {
  const { search, status, ordering, page, page_size } =
    getFilterSortOrdering(formData);

  const response = await Fetch({
    url: PRODUCTS,
    method: "GET",
    headers: getRequestHeaders(),
    next: {
      tags: ["products"],
    },
    params: {
      search,
      status,
      ordering,
      page,
      page_size,
    },
  });
  const body = await getResponseBody(response);

  if (!response.ok) {
    throw new Error(getResponseErrorMessage(body) || "Failed to get product");
  }

  const data = await productMapper(body.data?.results);

  if (formData?.get("with_pagination"))
    return {
      data,
      count: body.data?.count,
    };

  return data;
};

export const getOneProduct = async (item: string) => {
  const response = await fetch(`${PRODUCTS}${item}/`, {
    method: "GET",
    headers: getRequestHeaders(),
    next: {
      tags: [`product-${item}`],
    },
  });
  const body = await getResponseBody(response);

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(getResponseErrorMessage(body) || "Failed to get product");
  }
  return await productMapper(body?.data, true);
};
