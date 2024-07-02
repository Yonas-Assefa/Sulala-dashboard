"use server";

import { notFound } from "next/navigation";
import { GET_BRANDS } from "../../config/urls";
import {
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "../../lib/helper";
import { brandMapper } from "../mapper/brand-mapper";

export const getBrands = async () => {
  const response = await fetch(GET_BRANDS, {
    method: "GET",
    headers: getRequestHeaders(),
  });
  const body = await getResponseBody(response);
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(getResponseErrorMessage(body) || "Failed to get brands");
  }
  const mappedBrand = brandMapper(body.data?.results);
  return mappedBrand;
};
