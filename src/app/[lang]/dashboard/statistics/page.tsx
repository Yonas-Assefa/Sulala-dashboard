import React from "react";
import StatDisplay from "./components/StatDisplay";
import { MetricsData } from "./types/chart-props.type";
import { getAllOrderDeliveryMetrics } from "@/actions/statistics/get-order-and-delivery-metrics";
import { changeObjToFormData } from "@/lib/helper";

async function page() {
  const metrics: MetricsData[] = await getAllOrderDeliveryMetrics(
    changeObjToFormData({}),
  );
  return (
    <div className="w-full h-full">
      <StatDisplay metricsData={metrics} />
    </div>
  );
}

export default page;
