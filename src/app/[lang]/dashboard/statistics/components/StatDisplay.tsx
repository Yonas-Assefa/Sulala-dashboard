"use client";
import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Data from "../data/index.json";
import StatisticNav from "./StatisticNav";
import DateRangeSelector from "@/components/common/form/DateRangeSelector";
import InfoMetricsPanelLarge from "./InfoMetrics/InfoMetricsPanelLarge";
import InfoMetricsDescription from "./InfoMetrics/InfoMetricsDescription";
import InfoMetricsPanelSmall from "./InfoMetrics/InfoMetricsPanelSmall";
import { ChartType } from "../types/chart-props.type";
import getChartData from "../utils/getChartData";
import SelectInput from "@/components/common/form/SelectInput";
import { getoneFromArray } from "@/utils/getOneFromArray";

Chart.register(CategoryScale);

function StatDisplay() {
  const [chartType, setChartType] = React.useState(ChartType.NONE);
  const [chartData, setChartData] = React.useState(getChartData(Data));
  const [chartTitle, setChartTitle] = React.useState<string>();

  const changeChartType = (chartType: ChartType, chartTitle?: string) => {
    setChartType(chartType);
    setChartTitle(chartTitle);
    setChartData(getChartData(Data));
  };

  return (
    <div className="w-full h-full">
      <StatisticNav />
      <div className="flex flex-row justify-end w-full items-center -mb-6 mt-2">
        <div className="max-w-[500px] min-w-[300px] border-2 bg-primary rounded-md flex justify-center items-center pb-2">
          <SelectInput
            data={[
              {
                label: "Bar Chart",
                value: ChartType.BAR,
              },
              {
                label: "Line Chart",
                value: ChartType.LINE,
              },
              {
                label: "Scatter Plot",
                value: ChartType.SCATTER_PLOT,
              },
              {
                label: "Pie Chart",
                value: ChartType.PIE,
              },
              {
                label: "Doughnut Chart",
                value: ChartType.DOUGHNUT,
              },
              {
                label: "Cohort Analysis",
                value: ChartType.COHORT_ANALYSIS,
              },
            ]}
            placeholder="Change Chart Type"
            onChange={(value) => setChartType(getoneFromArray(value))}
            disabled={chartType === ChartType.NONE}
          />
        </div>
        <div className="max-w-[500px] border-2 rounded-md border-primary/5">
          <DateRangeSelector />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 p-8 w-full h-full">
        <InfoMetricsPanelLarge
          chartType={chartType}
          chartData={chartData}
          chartText={chartTitle}
        />
        <InfoMetricsDescription
          label="Order Metrics"
          descriptions={[
            {
              title: "Order Fulfillment Rate",
              content: "The rate at which orders are fulfilled",
            },
            {
              title: "Average Delivery Time",
              content: "The average time taken to deliver orders",
            },
            {
              title: "Return Rate",
              content: "The rate at which orders are returned",
            },
            {
              title: "Order Cancellation Rate",
              content: "The rate at which orders are cancelled",
            },
          ]}
          onClick={() => setChartType(ChartType.LINE)}
        />
        <InfoMetricsPanelSmall
          chartType={ChartType.LINE}
          chartData={chartData}
          chartText="Order Fulfillment Rate"
          onClick={changeChartType}
        />
        <InfoMetricsPanelSmall
          chartType={ChartType.SCATTER_PLOT}
          chartData={chartData}
          chartText="Average Delivery Time"
          onClick={changeChartType}
        />
        <InfoMetricsPanelSmall
          chartType={ChartType.LINE}
          chartData={chartData}
          chartText="Return Rate"
          onClick={changeChartType}
        />
        <InfoMetricsPanelSmall
          chartType={ChartType.SCATTER_PLOT}
          chartData={chartData}
          chartText="Order Cancellation Rate"
          onClick={changeChartType}
        />
      </div>
    </div>
  );
}

export default StatDisplay;
