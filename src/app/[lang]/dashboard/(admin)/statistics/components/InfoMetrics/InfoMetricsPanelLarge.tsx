import React from "react";
import { InfoMetricsPanelProps } from "../../types/metrics-info.type";
import getChartComponent from "../../utils/getChartComponent";
import { ChartType } from "../../types/chart-props.type";
import CohortAnalysisChart from "../CohortAnalysisChart";

function InfoMetricsPanelLarge({
  chartData,
  chartType,
  chartText,
}: InfoMetricsPanelProps) {
  return (
    <div className="bg-primary/5 p-3 col-span-3 row-span-2">
      {chartType !== ChartType.NONE ? (
        getChartComponent({ chartType, chartData, chartText }, "large")
      ) : (
        <div className="h-full w-full flex flex-col justify-center items-center text-black/30 relative">
          <img
            src="/sulala-logo.svg"
            alt=""
            className="absolute opacity-5 w-40"
          />
          <p>Start clicking on graphs below to load it here!</p>
        </div>
      )}
    </div>
  );
}

export default InfoMetricsPanelLarge;
