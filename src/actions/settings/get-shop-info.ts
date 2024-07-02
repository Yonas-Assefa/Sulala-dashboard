"use server";

import { GET_SHOP_ACCOUNT } from "../../config/urls";
import { shopMapper } from "../mapper/shop-mapper";
import {
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "../../lib/helper";

export const getShopInfo = async () => {
  const response = await fetch(GET_SHOP_ACCOUNT, {
    method: "GET",
    headers: getRequestHeaders(),
    cache: "no-cache",
    next: {
      tags: ["shop-info-detail"],
    },
  });

  const body = await getResponseBody(response);

  if (!response.ok) {
    throw new Error(getResponseErrorMessage(body) || "Failed to get shop info");
  }

  return shopMapper(body.data);
};
