import React from "react";
import CohortGraph from "react-cohort-graph";
import { ChartProps } from "../types/chart-props.type";

function CohortAnalysisChart({
  chartData,
  className,
  label,
  style,
}: ChartProps) {
  const data = chartData ?? {
    weeks: [],
  };
  return (
    <div className={`h-full w-full ${className} overflow-visible`}>
      <div className="h-full w-full overflow-scroll bg-dnger">
        <h2>{label}</h2>
        <CohortGraph
          data={{
            weeks: {
              "Week 1": [1, 2, 3, 4, 5],
              "Week 2": [2, 3, 4, 5, 6],
              "Week 3": [3, 4, 5, 6, 7],
              "Week 4": [4, 5, 6, 7, 8],
            },
          }}
          tableBodyStyles={{
            backgroundColor: "#176635a5",
            color: "#a2a6ac",
            fontWeight: "bold",
            ...style,
          }}
          tableHeadingStyles={{
            backgroundColor: "#a2a6ac",
            color: "#fff",
          }}
          headerCellStyles={{
            backgroundColor: "#176635",
            color: "#fff",
          }}
          showHeaderValues
        />
      </div>
    </div>
  );
}

export default CohortAnalysisChart;
