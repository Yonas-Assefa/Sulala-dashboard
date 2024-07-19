import React from "react";
import getChartComponent from "../../utils/getChartComponent";
import { InfoMetricsPanelProps } from "../../types/metrics-info.type";
import { ChartType } from "../../types/chart-props.type";

function InfoMetricsPanelSmall({
  chartData,
  chartType,
  chartText,
  caChartData,
  onClick,
}: InfoMetricsPanelProps & {
  onClick: (chartType: ChartType, chartTitle?: string) => void;
}) {
  const handleClick = () => {
    onClick(chartType, chartText);
  };
  return (
    <div className="bg-tertiary p-3 cursor-pointer" onClick={handleClick}>
      {getChartComponent({ chartType, chartData, caChartData, chartText })}
    </div>
  );
}

export default InfoMetricsPanelSmall;
