"use client";
import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
// import Data from "../data/index.json";
import StatisticNav from "./StatisticNav";
import DateRangeSelector from "@/components/common/form/DateRangeSelector";
import InfoMetricsPanelLarge from "./InfoMetrics/InfoMetricsPanelLarge";
import InfoMetricsDescription from "./InfoMetrics/InfoMetricsDescription";
import InfoMetricsPanelSmall from "./InfoMetrics/InfoMetricsPanelSmall";
import {
  ChartData,
  ChartType,
  DateRange,
  MetricsData,
  RangeType,
} from "../types/chart-props.type";
import getChartData from "../utils/getChartData";
import SelectInput from "@/components/common/form/SelectInput";
import { getoneFromArray } from "@/utils/getOneFromArray";
import ColorPaletteInput from "@/components/common/form/ColorPaletteInput";

Chart.register(CategoryScale);

const selectRangeData = [
  {
    label: "Day",
    value: RangeType.DAY,
  },
  {
    label: "Week",
    value: RangeType.WEEK,
  },
  {
    label: "Month",
    value: RangeType.MONTH,
  },
  {
    label: "Year",
    value: RangeType.YEAR,
  },
];

const selectChartData = [
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
  // {
  //     label: "Pie Chart",
  //     value: ChartType.PIE,
  // },
  // {
  //     label: "Doughnut Chart",
  //     value: ChartType.DOUGHNUT,
  // },
  // {
  //     label: "Cohort Analysis",
  //     value: ChartType.COHORT_ANALYSIS,
  // },
];

const metricsData: MetricsData[] = [
  {
    id: "order_fulfillment_rate",
    title: "Order Fulfillment Rate",
    content: "The rate at which orders are fulfilled",
    data: [
      {
        year: 2021,
        value: 100,
      },
      {
        year: 2022,
        value: 90,
      },
      {
        year: 2023,
        value: 80,
      },
      {
        year: 2024,
        value: 70,
      },
      {
        year: 2025,
        value: 60,
      },
    ],
    defaultChartType: ChartType.LINE,
  },
  {
    id: "average_delivery_time",
    title: "Average Delivery Time",
    content: "The average time taken to deliver orders",
    data: [
      {
        year: 2021,
        value: 5,
      },
      {
        year: 2022,
        value: 6,
      },
      {
        year: 2023,
        value: 7,
      },
      {
        year: 2024,
        value: 8,
      },
      {
        year: 2025,
        value: 9,
      },
    ],
    defaultChartType: ChartType.SCATTER_PLOT,
  },
  {
    id: "return_rate",
    title: "Return Rate",
    content: "The rate at which orders are returned",
    data: [
      {
        year: 2021,
        value: 10,
      },
      {
        year: 2022,
        value: 20,
      },
      {
        year: 2023,
        value: 30,
      },
      {
        year: 2024,
        value: 40,
      },
      {
        year: 2025,
        value: 50,
      },
    ],
    defaultChartType: ChartType.LINE,
  },
  {
    id: "order_cancellation_rate",
    title: "Order Cancellation Rate",
    content: "The rate at which orders are cancelled",
    data: [
      {
        year: 2021,
        value: 5,
      },
      {
        year: 2022,
        value: 10,
      },
      {
        year: 2023,
        value: 15,
      },
      {
        year: 2024,
        value: 20,
      },
      {
        year: 2025,
        value: 25,
      },
    ],
    defaultChartType: ChartType.SCATTER_PLOT,
  },
];

function StatDisplay() {
  const [chartType, setChartType] = React.useState(ChartType.NONE);
  const [chartData, setChartData] = React.useState<MetricsData>();
  const [_rangeType, setRangeType] = React.useState<RangeType>(RangeType.DAY);
  const [dateRange, setDateRange] = React.useState<DateRange>();
  const [colorPalette, setColorPalette] = React.useState<string[]>([
    "#176635",
    "#a2a6ac",
  ]);

  const changeChartData = (id: string) => {
    const data = metricsData.find((item) => item.id === id);
    if (data) {
      setChartData(data);
      setChartType(data.defaultChartType);
    }
  };

  const changeChartType = (type: ChartType) => {
    setChartType(type);
  };

  const changeRangeType = (type: RangeType) => {
    setRangeType(type);
  };

  const changeDateRange = (range: DateRange) => {
    setDateRange(range);
  };

  const isChartType = (value: unknown): value is ChartType => {
    return Object.values(ChartType).includes(value as ChartType);
  };

  const isRangeType = (value: unknown): value is RangeType => {
    return Object.values(RangeType).includes(value as RangeType);
  };

  const handleSelectChartType = (value: unknown) => {
    const chartType = getoneFromArray(value);
    if (chartType && typeof chartType === "string" && isChartType(chartType))
      changeChartType(chartType as ChartType);
  };

  const handleSelectRangeType = (value: unknown) => {
    const rangeType = getoneFromArray(value);
    if (rangeType && typeof rangeType === "string" && isRangeType(rangeType))
      setRangeType(rangeType as RangeType);
  };

  const convertMetricsToChartData = (
    data?: MetricsData,
  ): ChartData | undefined => {
    if (!data) return undefined;
    return {
      labels: data.data.map(
        (item) =>
          (item.year || item.month || item.week || item.day)?.toString() || "",
      ),
      datasets: [
        {
          label: data.title,
          data: data.data.map((item) => item.value),
          backgroundColor: colorPalette.slice(0, data.data.length),
          borderColor: colorPalette[0],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="w-full h-full">
      <StatisticNav />
      <div className="flex flex-col md:flex-row justify-center md:justify-end w-full items-stretch -mb-6 mt-2">
        <div className="max-w-[500px] min-w-[300px] rounded-md flex justify-center items-center pb-2">
          <ColorPaletteInput
            data={selectRangeData}
            placeholder="Select Range"
            onChange={(colors: string[]) => setColorPalette(colors)}
            disabled={chartType === ChartType.NONE}
            className="rounded-md border-1 border-primary/5"
            inputAreaOnly
          />
        </div>
        <div className="max-w-[500px] min-w-[300px] rounded-md flex justify-center items-center pb-2">
          <SelectInput
            data={selectRangeData}
            placeholder="Select Range"
            onChange={handleSelectRangeType}
            disabled={chartType === ChartType.NONE}
            className="rounded-md border-1 border-primary/5"
            inputAreaOnly
          />
        </div>
        <div className="max-w-[500px] min-w-[300px] rounded-md flex justify-center items-center pb-2">
          <SelectInput
            data={selectChartData}
            placeholder="Change Chart Type"
            onChange={handleSelectChartType}
            disabled={chartType === ChartType.NONE}
            className="rounded-md border-1 border-primary/5"
            inputAreaOnly
          />
        </div>
        <div className="max-w-[500px] border-2 h-full py-[3px] rounded-md border-primary/5">
          <DateRangeSelector />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 p-8 w-full h-full">
        <InfoMetricsPanelLarge
          chartType={chartType}
          chartData={convertMetricsToChartData(chartData)}
          chartText={chartData?.title}
        />
        <InfoMetricsDescription
          label="Order Metrics"
          metricsData={metricsData}
          chartData={chartData}
          onClick={changeChartData}
        />
        {metricsData.map((data) => (
          <InfoMetricsPanelSmall
            key={data.id}
            chartType={data.defaultChartType}
            chartData={convertMetricsToChartData(data)}
            chartText={data.title}
            id={data.id}
          />
        ))}
      </div>
    </div>
  );
}

export default StatDisplay;
