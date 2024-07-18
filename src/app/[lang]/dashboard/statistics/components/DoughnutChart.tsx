import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartProps } from "../types/chart-props.type";

function DoughnutChart({ chartData, chartText, className, label }: ChartProps) {
  return (
    <div className={className}>
      <h2>{label}</h2>
      <Doughnut
        data={chartData!}
        options={{
          plugins: {
            title: {
              display: true,
              text: chartText,
            },
          },
        }}
      />
    </div>
  );
}

export default DoughnutChart;
