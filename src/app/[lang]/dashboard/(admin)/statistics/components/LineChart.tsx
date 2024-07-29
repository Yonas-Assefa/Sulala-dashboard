"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { ChartProps } from "../types/chart-props.type";

function LineChart({ chartData, chartText, className, label }: ChartProps) {
  return (
    <div className={className}>
      <h2>{label}</h2>
      <Line
        data={chartData!}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: chartText,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;
