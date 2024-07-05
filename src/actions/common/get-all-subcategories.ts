"use server";

import { notFound } from "next/navigation";
import { ALL_SUBCATEGORIES } from "../../config/urls";
import { getRequestHeaders, getResponseBody } from "../../lib/helper";
import convertAndGroupCategories from "@/lib/convertAndGroupCategories";

export const getAllSubCategories = async () => {
  const response = await fetch(ALL_SUBCATEGORIES, {
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
  const formatedCategory = convertAndGroupCategories(body.data?.results);
  return formatedCategory;
};
