import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartProps } from "../types/chart-props.type";

function DoughnutChart({ chartData, chartText, className, label }: ChartProps) {
  return (
    <div className={`h-full w-full ${className}`}>
      <div className="h-full w-auto mx-auto px-auto ">
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
    </div>
  );
}

export default DoughnutChart;
