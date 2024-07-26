import { getCategories } from "../common/get-categories";
import { constructImageUrl } from "@/lib/images";
import { animalMapper } from "./animal-mapper";
import {
  ChartType,
  MetricsData,
} from "@/app/[lang]/dashboard/statistics/types/chart-props.type";

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
  fulfillment_rate: IMetricsResponse;
  average_delivery_time: IMetricsResponse;
  cancellation_rate: IMetricsResponse;
}

export const metricsMapper = (data: IIncomintRawMetricsData): MetricsData[] => {
  const orderFulfillmentRate: MetricsData = {
    id: "order_fulfillment_rate",
    title: "Order Fulfillment Rate",
    content: "The rate at which orders are fulfilled",
    legend: "Orders Fulfilled",
    XAxis: getDateRange(data.fulfillment_rate.time_frame as TIncomingRange),
    YAxis: "Orders Fulfilled",
    data: getDatesAndValues(
      data.fulfillment_rate.results,
      data.fulfillment_rate.time_frame as TIncomingRange,
    ),
    defaultChartType: ChartType.LINE,
  };
  const averageDeliveryTime: MetricsData = {
    id: "average_delivery_time",
    title: "Average Delivery Time",
    content: "The average time taken to deliver orders",
    legend: "Average Delivery Time",
    XAxis: getDateRange(
      data.average_delivery_time.time_frame as TIncomingRange,
    ),
    YAxis: "Average Delivery Time",
    data: getDatesAndValues(
      data.average_delivery_time.results,
      data.average_delivery_time.time_frame as TIncomingRange,
    ),
    defaultChartType: ChartType.LINE,
  };

  const orderCancellationRate: MetricsData = {
    id: "order_cancellation_rate",
    title: "Order Cancellation Rate",
    content: "The rate at which orders are cancelled",
    legend: "Orders Cancelled",
    XAxis: getDateRange(data.cancellation_rate.time_frame as TIncomingRange),
    YAxis: "Orders Cancelled",
    data: getDatesAndValues(
      data.cancellation_rate.results,
      data.cancellation_rate.time_frame as TIncomingRange,
    ),
    defaultChartType: ChartType.LINE,
  };

  return [orderFulfillmentRate, averageDeliveryTime, orderCancellationRate];
};

type TIncomingRange = "annually" | "monthly" | "weekly" | "daily" | "custom";

const getDatesAndValues = (
  results: IMetricsDataResponse[],
  range: TIncomingRange,
) => {
  return results.map((result) => ({
    date:
      range === "daily"
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
