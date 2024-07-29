import React from "react";
import { Scatter } from "react-chartjs-2";
import { ChartProps } from "../types/chart-props.type";

function ScatterChart({ chartData, chartText, className, label }: ChartProps) {
  return (
    <div className={className}>
      <h2>{label}</h2>
      <Scatter
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

export default ScatterChart;
