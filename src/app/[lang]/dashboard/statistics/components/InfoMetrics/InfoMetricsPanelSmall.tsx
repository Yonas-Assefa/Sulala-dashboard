import React from "react";
import getChartComponent from "../../utils/getChartComponent";
import { InfoMetricsPanelProps } from "../../types/metrics-info.type";

function InfoMetricsPanelSmall({
  chartData,
  chartType,
  chartText,
  caChartData,
}: InfoMetricsPanelProps) {
  return (
    <div className="bg-tertiary p-3">
      {getChartComponent({ chartType, chartData, caChartData, chartText })}
    </div>
  );
}

export default InfoMetricsPanelSmall;
