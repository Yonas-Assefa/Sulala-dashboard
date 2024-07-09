"use server";

import { notFound } from "next/navigation";
import { CATEGORIES } from "../../config/urls";
import {
  formatCategory,
  getRequestHeaders,
  getResponseBody,
} from "../../lib/helper";

export const getCategories = async () => {
  const response = await fetch(CATEGORIES, {
    method: "GET",
    headers: getRequestHeaders(),
  });
  const body = await getResponseBody(response);

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(body.message || "Failed to getch categories");
  }
  const formatedCategory = formatCategory(body.data?.results);
  return formatedCategory;
};
