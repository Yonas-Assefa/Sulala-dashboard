"use client";
import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "./components/LineChart";
import Data from "./data/index.json";
import StatisticNav from "./components/StatisticNav";
import DateRangeSelector from "@/components/common/form/DateRangeSelector";

Chart.register(CategoryScale);

function page() {
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
      <div className="flex flex-row justify-end w-full items-center mt-4">
        <div className="max-w-[500px] border-2 rounded-md border-primary/50">
          <DateRangeSelector />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 p-8 w-full h-full">
        <div className="bg-gradient-to-r from-primary/5 to-primary/15 p-3 col-span-3 row-span-2">
          <LineChart
            chartData={chartData}
            chartText="Order & Delivery Metrics"
          />
        </div>
        <div className="bg-tertiary p-3 row-span-2"></div>
        <div className="bg-tertiary p-3">
          <LineChart chartData={chartData} chartText="Order Fulfillment Rate" />
        </div>
        <div className="bg-tertiary p-3">
          <LineChart chartData={chartData} chartText="Average Delivery Time" />
        </div>
        <div className="bg-tertiary p-3">
          <LineChart chartData={chartData} chartText="Return Rate" />
        </div>
        <div className="bg-tertiary p-3">
          <LineChart
            chartData={chartData}
            chartText="Order Cancellation Rate"
          />
        </div>
      </div>
    </div>
  );
}

export default page;
