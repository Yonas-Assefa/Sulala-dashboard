"use server";
import { SHOP_REVENUE_URL } from "@/config/urls";
import { getRequestHeaders, getResponseErrorMessage } from "@/lib/helper";

export const getVendorsRevenueStas = async () => {
  const shopRevenueResponse = await fetch(SHOP_REVENUE_URL, {
    method: "GET",
    headers: getRequestHeaders(),
  });

  const shopRevenueBody = await shopRevenueResponse.json();
  if (!shopRevenueResponse.ok) {
    throw new Error(
      getResponseErrorMessage(shopRevenueBody) || "Failed to get shop revenue",
    );
  }

  return shopRevenueBody.data;
};
