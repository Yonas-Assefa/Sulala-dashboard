import React from "react";
import getChartComponent from "../../utils/getChartComponent";
import { InfoMetricsPanelProps } from "../../types/metrics-info.type";
import { ChartType } from "../../types/chart-props.type";

function InfoMetricsPanelSmall({
  chartData,
  chartType,
  onClick,
  chartText,
  id,
}: InfoMetricsPanelProps) {
  return (
    <div
      className="bg-tertiary p-3 cursor-pointer"
      onClick={() => id && onClick && onClick(id)}
    >
      {getChartComponent({ chartType, chartData, chartText })}
    </div>
  );
}

export default InfoMetricsPanelSmall;
