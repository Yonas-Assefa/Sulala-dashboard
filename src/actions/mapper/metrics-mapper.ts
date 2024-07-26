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
    XAxis: "Year",
    YAxis: "Orders Fulfilled",
    data: data.fulfillment_rate.results.map((result) => ({
      year: new Date(result.date).getFullYear(),
      value: result.metric_value,
    })),
    defaultChartType: ChartType.LINE,
  };
  const averageDeliveryTime: MetricsData = {
    id: "average_delivery_time",
    title: "Average Delivery Time",
    content: "The average time taken to deliver orders",
    legend: "Average Delivery Time",
    XAxis: "Year",
    YAxis: "Average Delivery Time",
    data: data.average_delivery_time.results.map((result) => ({
      year: new Date(result.date).getFullYear(),
      value: result.metric_value,
    })),
    defaultChartType: ChartType.LINE,
  };

  const orderCancellationRate: MetricsData = {
    id: "order_cancellation_rate",
    title: "Order Cancellation Rate",
    content: "The rate at which orders are cancelled",
    legend: "Orders Cancelled",
    XAxis: "Year",
    YAxis: "Orders Cancelled",
    data: data.cancellation_rate.results.map((result) => ({
      year: new Date(result.date).getFullYear(),
      value: result.metric_value,
    })),
    defaultChartType: ChartType.LINE,
  };

  return [orderFulfillmentRate, averageDeliveryTime, orderCancellationRate];
};
