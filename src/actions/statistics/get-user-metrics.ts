"use server";

import { USER_METRICS } from "../../config/urls";
import { userMetricsMapper } from "../mapper/user-metrics-mapper";
import {
  Fetch,
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "../../lib/helper";
import { notFound } from "next/navigation";
import { getStatisticsMetricsQuery } from "@/lib/statistics-metrics-query";
import { MetricsData } from "@/app/[lang]/dashboard/(admin)/statistics/types/chart-props.type";

type Args = {
  search: string | undefined;
};

export const getAllUserMetrics = async <T>(
  formData: FormData,
): Promise<MetricsData[]> => {
  const { end_date, item_type, start_date, time_frame } =
    getStatisticsMetricsQuery(formData);

  const URL =
    item_type === "new_user_registration"
      ? USER_METRICS.NEW_USER_REGISTRATION
      : item_type === "active_users"
        ? USER_METRICS.ACTIVE_USERS
        : item_type === "user_over_time"
          ? USER_METRICS.USER_OVER_TIME
          : item_type === "user_retention_data"
            ? USER_METRICS.USER_RETENTION_DATA
            : USER_METRICS.ALL_METRICS;

  const response = await Fetch({
    url: URL,
    method: "GET",
    headers: getRequestHeaders(),
    next: {
      tags: ["all-user-metrics"],
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

  return userMetricsMapper(body.data);
};
