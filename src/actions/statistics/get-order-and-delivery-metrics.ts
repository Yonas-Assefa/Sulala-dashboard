"use server";

import { ORDER_AND_DELIVERY_METRICS } from "../../config/urls";
import { metricsMapper } from "../mapper/metrics-mapper";
import {
  Fetch,
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "../../lib/helper";
import { notFound } from "next/navigation";
import { getStatisticsMetricsQuery } from "@/lib/statistics-metrics-query";
import { MetricsData } from "@/app/[lang]/dashboard/statistics/types/chart-props.type";

type Args = {
  search: string | undefined;
};

export const getAllOrderDeliveryMetrics = async <T>(
  formData: FormData,
): Promise<MetricsData[]> => {
  const { end_date, item_type, start_date, time_frame } =
    getStatisticsMetricsQuery(formData);

  const URL =
    item_type === "order_cancel_rate"
      ? ORDER_AND_DELIVERY_METRICS.ORDER_CANCEL_RATE
      : item_type === "average_delivery_time"
        ? ORDER_AND_DELIVERY_METRICS.AVERAGE_DELIVERY_TIME
        : item_type === "order_fulfillment_rate"
          ? ORDER_AND_DELIVERY_METRICS.ORDER_FULFILLMENT_RATE
          : ORDER_AND_DELIVERY_METRICS.ALL_METRICS;

  const response = await Fetch({
    url: URL,
    method: "GET",
    headers: getRequestHeaders(),
    next: {
      tags: ["all-order-delivery-metrics"],
    },
    params: {
      start_date,
      end_date,
      time_frame,
    },
  });

  const body = await getResponseBody(response);

  if (!response.ok) {
    throw new Error(
      getResponseErrorMessage(body) || "Failed to get statistics metrics",
    );
  }

  return metricsMapper(body.data);
};
