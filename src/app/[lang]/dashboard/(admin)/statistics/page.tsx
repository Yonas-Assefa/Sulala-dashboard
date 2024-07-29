import React from "react";
import StatDisplay from "./components/StatDisplay";
import { MetricsData } from "./types/chart-props.type";
import { getAllOrderDeliveryMetrics } from "@/actions/statistics/get-order-and-delivery-metrics";
import { changeObjToFormData } from "@/lib/helper";
import StatisticNav from "./components/StatisticNav";

type Props = {
  searchParams: {
    start_date: string;
    end_date: string;
    time_frame: string;
  };
};
async function page({ searchParams }: Props) {
  const formData = changeObjToFormData({ ...searchParams });
  const metrics: MetricsData[] = await getAllOrderDeliveryMetrics(formData);
  const metricsNav = [
    {
      label: "Order & Delivery Metrics",
      value: "order_delivery_metrics",
    },
    {
      label: "User Metrics",
      value: "user_metrics",
    },
  ];
  return (
    <div className="w-full h-full">
      <StatisticNav metricsNav={metricsNav} />
      <StatDisplay metricsData={metrics} />
    </div>
  );
}

export default page;
