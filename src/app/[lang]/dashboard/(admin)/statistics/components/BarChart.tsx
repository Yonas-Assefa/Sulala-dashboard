import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartProps } from "../types/chart-props.type";

function BarChart({ chartData, chartText, className, label }: ChartProps) {
  return (
    <div className={className}>
      <h2>{label}</h2>
      <Bar
        data={chartData!}
        options={{
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

export default BarChart;
