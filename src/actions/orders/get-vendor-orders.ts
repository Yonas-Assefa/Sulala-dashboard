"use server";

import { ORDERS_URL } from "@/config/urls";
import { getRequestHeaders } from "@/lib/helper";

export const getOrders = async () => {
  const ordersResponse = await fetch(ORDERS_URL, {
    method: "GET",
    headers: getRequestHeaders(),
  });
  const ordersBody = await ordersResponse.json();
  if (!ordersResponse.ok || !ordersBody.results) {
    throw new Error(ordersBody.message || "Failed to get Orders");
  }

  return await ordersBody.results;
};
