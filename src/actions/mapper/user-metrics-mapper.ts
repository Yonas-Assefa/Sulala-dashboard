import { getCategories } from "../common/get-categories";
import { constructImageUrl } from "@/lib/images";
import { animalMapper } from "./animal-mapper";
import {
  ChartType,
  MetricsData,
} from "@/app/[lang]/dashboard/(admin)/statistics/types/chart-props.type";

interface IMetricsDataResponse {
  date: string;
  metric_value: number;
}

interface IMetricsMetaInfo {
  metrics_name: string;
  time_frame: string;
  start_date: string;
  end_date: string;
}

interface IMetricsResponse extends IMetricsMetaInfo {
  results: IMetricsDataResponse[];
}

interface IIncomintRawMetricsData {
  total_users: IMetricsResponse;
  active_users: IMetricsResponse;
  new_users: IMetricsResponse;
  user_retention_rate: IMetricsResponse;
}

export const userMetricsMapper = (
  data: IIncomintRawMetricsData,
): MetricsData[] => {
  const totalUsers: MetricsData = {
    id: "total_users",
    title: "Total Users",
    content: "The total number of registered users on the platform",
    legend: "Total Users",
    XAxis: getDateRange(data.total_users.time_frame as TIncomingRange),
    YAxis: "Total Users",
    data: getDatesAndValues(
      data.total_users.results,
      data.total_users.time_frame as TIncomingRange,
    ),
    defaultChartType: ChartType.LINE,
  };
  const activeUsers: MetricsData = {
    id: "active_users",
    title: "Active Users",
    content:
      "The number of users who have logged in or made a purchase within a specific period",
    legend: "Active Users",
    XAxis: getDateRange(data.active_users.time_frame as TIncomingRange),
    YAxis: "Active Users",
    data: getDatesAndValues(
      data.active_users.results,
      data.active_users.time_frame as TIncomingRange,
    ),
    defaultChartType: ChartType.LINE,
  };

  const newUsers: MetricsData = {
    id: "new_users",
    title: "New Users",
    content:
      "The number of new users who have signed up within a specific period",
    legend: "New Users",
    XAxis: getDateRange(data.new_users.time_frame as TIncomingRange),
    YAxis: "New Users",
    data: getDatesAndValues(
      data.new_users.results,
      data.new_users.time_frame as TIncomingRange,
    ),
    defaultChartType: ChartType.BAR,
  };

  const userRetentionRate: MetricsData = {
    id: "user_retention_rate",
    title: "User Retention Rate",
    content:
      "The percentage of users who continue to use the platform over time",
    legend: "Retention Rate",
    XAxis: getDateRange(data.user_retention_rate.time_frame as TIncomingRange),
    YAxis: "Retention Rate Percentage",
    data: getDatesAndValues(
      data.user_retention_rate.results,
      data.user_retention_rate.time_frame as TIncomingRange,
    ),
    defaultChartType: ChartType.COHORT_ANALYSIS,
  };

  return [totalUsers, activeUsers, newUsers, userRetentionRate];
};

type TIncomingRange = "annually" | "monthly" | "weekly" | "daily" | "custom";

const getDatesAndValues = (
  results: IMetricsDataResponse[],
  range: TIncomingRange,
) => {
  return results.map((result) => ({
    date:
      range === "custom"
        ? new Date(result.date).toLocaleDateString()
        : range === "weekly"
          ? new Date(result.date).toLocaleDateString()
          : range === "monthly"
            ? new Date(result.date).toLocaleString("en-US", { month: "long" })
            : new Date(result.date).toLocaleString("en-US", {
                year: "numeric",
              }),
    value: result.metric_value,
  }));
};

const getDateRange = (range: TIncomingRange) => {
  return range === "custom"
    ? "Day"
    : range === "weekly"
      ? "Week"
      : range === "monthly"
        ? "Month"
        : "Year";
};
