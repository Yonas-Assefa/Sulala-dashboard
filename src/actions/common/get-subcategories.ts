"use server";

import { notFound } from "next/navigation";
import { SUBCATEGORIES } from "../../config/urls";
import {
  formatCategory,
  getRequestHeaders,
  getResponseBody,
} from "../../lib/helper";

export const getSubCategories = async () => {
  const response = await fetch(SUBCATEGORIES, {
    method: "GET",
    headers: getRequestHeaders(),
  });
  const body = await getResponseBody(response);
  if (!response.ok || !body.data) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(body.message || "Failed to get subcategories");
  }
  const formatedCategory = formatCategory(body.data?.results);
  return formatedCategory;
};
