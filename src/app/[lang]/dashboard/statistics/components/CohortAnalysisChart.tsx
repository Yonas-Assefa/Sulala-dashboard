import React from "react";
import CohortGraph from "react-cohort-graph";
import { ChartProps } from "../types/chart-props.type";

function CohortAnalysisChart({ caChartData, className, label }: ChartProps) {
  return (
    <div className={className}>
      <h2>{label}</h2>
      <CohortGraph data={caChartData!} />
    </div>
  );
}

export default CohortAnalysisChart;
