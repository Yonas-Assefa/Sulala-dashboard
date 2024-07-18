"use client";
import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "./components/LineChart";
import Data from "./data/index.json";
import StatisticNav from "./components/StatisticNav";

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
      <div className="grid grid-cols-2 grid-rows-2 gap-4 p-8 w-full h-full">
        <div className="bg-tertiary p-3">
          <LineChart chartData={chartData} />
        </div>
        <div className="bg-tertiary p-3">
          <LineChart chartData={chartData} />
        </div>
        <div className="bg-tertiary p-3">
          <LineChart chartData={chartData} />
        </div>
        <div className="bg-tertiary p-3">
          <LineChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
}

export default page;
