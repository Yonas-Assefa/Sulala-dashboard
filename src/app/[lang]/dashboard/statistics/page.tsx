import React from "react";
import StatDisplay from "./components/StatDisplay";
import { MetricsData } from "./types/chart-props.type";
import { getAllOrderDeliveryMetrics } from "@/actions/statistics/get-order-and-delivery-metrics";
import { changeObjToFormData } from "@/lib/helper";

type Props = {
  searchParams: {
    start_date: string;
    end_date: string;
    time_frame: string;
  };
};
async function page({ searchParams }: Props) {
  const metrics: MetricsData[] = await getAllOrderDeliveryMetrics(
    changeObjToFormData({ ...searchParams }),
  );
  console.log({ metrics });
  return (
    <div className="w-full h-full">
      <StatDisplay metricsData={metrics} />
    </div>
  );
}

export default page;
