"use client";
import React, { useEffect } from "react";
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
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import { DateValueType } from "react-tailwindcss-datepicker";

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
  {
    label: "Pie Chart",
    value: ChartType.PIE,
  },
  {
    label: "Doughnut Chart",
    value: ChartType.DOUGHNUT,
  },
  // {
  //   label: "Cohort Analysis",
  //   value: ChartType.COHORT_ANALYSIS,
  // },
];

function StatDisplay({ metricsData }: { metricsData: MetricsData[] }) {
  const { createQueryStringAndPush, searchParams } = useCreateQueryString();

  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");

  const [chartType, setChartType] = React.useState(ChartType.NONE);
  const [chartData, setChartData] = React.useState<MetricsData>();
  const [_rangeType, setRangeType] = React.useState<RangeType>(RangeType.DAY);
  const [dateRange, setDateRange] = React.useState<DateValueType>(
    start_date && end_date
      ? {
          startDate: new Date(searchParams.get("start_date") || ""),
          endDate: new Date(searchParams.get("end_date") || ""),
        }
      : {
          startDate: new Date(),
          endDate: new Date(),
        },
  );
  const [colorPalette, setColorPalette] = React.useState<string[]>([
    "#176635",
    "#a2a6ac",
  ]);

  useEffect(() => {
    if (metricsData.length > 0) {
      if (chartData) {
        const data = metricsData.find((item) => item.id === chartData.id);
        if (data) {
          setChartData(data);
          setChartType(data.defaultChartType);
        }
      } else {
        setChartData(metricsData[0]);
        setChartType(metricsData[0].defaultChartType);
      }
    }
  }, [metricsData]);

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

  const changeDateRange = (range: DateValueType) => {
    if (range && range.startDate && range.endDate) {
      createQueryStringAndPush([
        { key: "start_date", value: range.startDate?.toString() },
        { key: "end_date", value: range?.endDate?.toString() },
      ]);
      setDateRange(range);
    }
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
      createQueryStringAndPush(
        "time_frame",
        rangeType == RangeType.DAY
          ? "custom"
          : rangeType == RangeType.WEEK
            ? "weekly"
            : rangeType == RangeType.MONTH
              ? "monthly"
              : "annually",
      );
    setRangeType(rangeType as RangeType);
  };

  const handleColorPaletteSelect = (value: string[]) => {
    if (value.length > 0) setColorPalette(value);
    else setColorPalette(["#176635", "#a2a6ac"]);
  };

  const convertMetricsToChartData = (
    data?: MetricsData,
  ): ChartData | undefined => {
    if (!data) return undefined;
    return {
      labels: data.data.map((item) => item.date?.toString() || ""),
      datasets: [
        {
          label: data.title,
          data: data.data.map((item) => item.value),
          backgroundColor:
            colorPalette.length > 1
              ? colorPalette.slice(1, colorPalette.length)
              : colorPalette,
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
            placeholder="Select Color Palette"
            onChange={handleColorPaletteSelect}
            disabled={
              chartType === ChartType.NONE ||
              start_date === null ||
              end_date === null
            }
            className="rounded-md border-1 border-primary/5"
            inputAreaOnly
            defaultValue={colorPalette}
          />
        </div>
        <div className="max-w-[500px] min-w-[300px] rounded-md flex justify-center items-center pb-2">
          <SelectInput
            data={selectRangeData}
            placeholder="Select Range"
            onChange={handleSelectRangeType}
            disabled={
              chartType === ChartType.NONE ||
              start_date === null ||
              end_date === null
            }
            className="rounded-md border-1 border-primary/5"
            inputAreaOnly
          />
        </div>
        <div className="max-w-[500px] min-w-[300px] rounded-md flex justify-center items-center pb-2">
          <SelectInput
            data={selectChartData}
            placeholder="Change Chart Type"
            onChange={handleSelectChartType}
            disabled={
              chartType === ChartType.NONE ||
              start_date === null ||
              end_date === null
            }
            className="rounded-md border-1 border-primary/5"
            inputAreaOnly
          />
        </div>
        <div className="max-w-[500px] border-2 h-full py-[3px] rounded-md border-primary/5">
          <DateRangeSelector
            onChange={changeDateRange}
            disabled={chartType === ChartType.NONE}
          />
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
            onClick={changeChartData}
            isSelected={chartData?.id === data.id}
          />
        ))}
      </div>
    </div>
  );
}

export default StatDisplay;
