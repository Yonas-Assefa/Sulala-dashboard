"use server";

import { PROMOTIONS } from "../../config/urls";
import { promotionMapper } from "../mapper/promotion-mapper";
import {
  Fetch,
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "../../lib/helper";
import { notFound } from "next/navigation";
import { getFilterSortOrdering } from "@/lib/table";
import { TPromotion } from "@/types/mapper.type";

type Args = {
  search: string | undefined;
};

export const getPromotions = async <T>(formData: FormData): Promise<T> => {
  const { search, status, ordering, page, page_size } =
    getFilterSortOrdering(formData);

  const response = await Fetch({
    url: PROMOTIONS,
    method: "GET",
    headers: getRequestHeaders(),
    next: {
      tags: ["promotions"],
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
    throw new Error(
      getResponseErrorMessage(body) || "Failed to get promotions",
    );
  }

  if (formData?.get("with_pagination"))
    return {
      data: promotionMapper<TPromotion>({ data: body.data?.results }),
      count: body.data?.count,
    } as T;

  return promotionMapper<T>({
    data: body.data?.results,
    tableSearch: true,
  });
};

export const getOnePromotion = async (promotion_id: string) => {
  const response = await fetch(`${PROMOTIONS}${promotion_id}/`, {
    method: "GET",
    headers: getRequestHeaders(),
    next: {
      tags: [`promotion-detail-${promotion_id}`],
    },
  });
  const body = await getResponseBody(response);

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(body.message || "Failed to get promotions");
  }
  return promotionMapper({ data: body.data });
};
