"use server";
import { SHOP_REVENUE_URL } from "@/config/urls";
import { getRequestHeaders } from "@/lib/helper";

export const getVendorsRevenueStas = async () => {
  const shopRevenueResponse = await fetch(SHOP_REVENUE_URL, {
    method: "GET",
    headers: getRequestHeaders(),
  });

  const shopRevenueBody = await shopRevenueResponse.json();
  if (!shopRevenueResponse.ok || !shopRevenueBody.result) {
    throw new Error(shopRevenueBody.message || "Failed to get shop revenue");
  }

  console.log("shop stata: ", shopRevenueBody);
  return shopRevenueBody.result;
};
