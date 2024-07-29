import React from "react";
import CohortGraph from "react-cohort-graph";
import { ChartProps } from "../types/chart-props.type";

function CohortAnalysisChart({ chartData, className, label }: ChartProps) {
  const data = chartData ?? {
    weeks: [],
  };
  return (
    <div className={`h-full w-full ${className}`}>
      <div className="h-full w-auto mx-auto px-auto ">
        <h2>{label}</h2>
        <CohortGraph data={data} />
      </div>
    </div>
  );
}

export default CohortAnalysisChart;
