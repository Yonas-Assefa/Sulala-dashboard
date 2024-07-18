import React from "react";
import { Pie } from "react-chartjs-2";
import { ChartProps } from "../types/chart-props.type";

function PieChart({ chartData, chartText, className, label }: ChartProps) {
  return (
    <div className={className}>
      <h2>{label}</h2>
      <Pie
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

export default PieChart;
