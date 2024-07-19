"use client";
import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Data from "../data/index.json";
import StatisticNav from "./StatisticNav";
import DateRangeSelector from "@/components/common/form/DateRangeSelector";
import InfoMetricsPanelLarge from "./InfoMetrics/InfoMetricsPanelLarge";
import InfoMetricsDescription from "./InfoMetrics/InfoMetricsDescription";
import InfoMetricsPanelSmall from "./InfoMetrics/InfoMetricsPanelSmall";
import { ChartType } from "../types/chart-props.type";

Chart.register(CategoryScale);

function StatDisplay() {
  const chartData = {
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="w-full h-full">
      <StatisticNav />
      <div className="flex flex-row justify-end w-full items-center -mb-6 mt-2">
        <div className="max-w-[500px] border-2 rounded-md border-primary/5">
          <DateRangeSelector />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 p-8 w-full h-full">
        <InfoMetricsPanelLarge
          chartType={ChartType.BAR}
          chartData={chartData}
        />
        <InfoMetricsDescription
          label="Order Metrics"
          descriptions={[
            {
              title: "Order Fulfillment Rate",
              content: "The rate at which orders are fulfilled",
            },
            {
              title: "Average Delivery Time",
              content: "The average time taken to deliver orders",
            },
            {
              title: "Return Rate",
              content: "The rate at which orders are returned",
            },
            {
              title: "Order Cancellation Rate",
              content: "The rate at which orders are cancelled",
            },
          ]}
        />
        <InfoMetricsPanelSmall
          chartType={ChartType.LINE}
          chartData={chartData}
          chartText="Order Fulfillment Rate"
        />
        <InfoMetricsPanelSmall
          chartType={ChartType.SCATTER_PLOT}
          chartData={chartData}
          chartText="Average Delivery Time"
        />
        <InfoMetricsPanelSmall
          chartType={ChartType.LINE}
          chartData={chartData}
          chartText="Return Rate"
        />
        <InfoMetricsPanelSmall
          chartType={ChartType.SCATTER_PLOT}
          chartData={chartData}
          chartText="Order Cancellation Rate"
        />
      </div>
    </div>
  );
}

export default StatDisplay;
