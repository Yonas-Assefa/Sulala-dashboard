import React from "react";
import StatDisplay from "./components/StatDisplay";
import { MetricsData } from "./types/chart-props.type";
import { getAllOrderDeliveryMetrics } from "@/actions/statistics/get-order-and-delivery-metrics";
import { changeObjToFormData } from "@/lib/helper";
import StatisticNav from "./components/StatisticNav";
import { getAllUserMetrics } from "@/actions/statistics/get-user-metrics";

type Props = {
  searchParams: {
    start_date: string;
    end_date: string;
    time_frame: string;
    metrics: string;
  };
};
async function page({ searchParams: { metrics, ...searchParams } }: Props) {
  const formData = changeObjToFormData({ ...searchParams });
  const metricsData: MetricsData[] =
    // metrics === "order_delivery_metrics" ?
    await getAllOrderDeliveryMetrics(formData);
  // : await getAllUserMetrics(formData);
  const metricsNav = [
    {
      label: "Order & Delivery Metrics",
      value: "order_delivery_metrics",
    },
    // {
    //   label: "User Metrics",
    //   value: "user_metrics",
    // },
  ];
  return (
    <div className="w-full h-full">
      <StatisticNav metricsNav={metricsNav} />
      <StatDisplay metricsData={metricsData} />
    </div>
  );
}

export default page;
