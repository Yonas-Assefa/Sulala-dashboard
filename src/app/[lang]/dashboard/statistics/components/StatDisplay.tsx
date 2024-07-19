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
import { ChartType, RangeType } from "../types/chart-props.type";
import getChartData from "../utils/getChartData";
import SelectInput from "@/components/common/form/SelectInput";
import { getoneFromArray } from "@/utils/getOneFromArray";

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
]

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
]

function StatDisplay() {
    const [chartType, setChartType] = React.useState(ChartType.NONE);
    const [chartData, setChartData] = React.useState(getChartData(Data));
    const [chartTitle, setChartTitle] = React.useState<string>();
    const [rangeType, setRangeType] = React.useState<RangeType>(RangeType.DAY);

    const changeChartType = (chartType: ChartType, chartTitle?: string) => {
        setChartType(chartType);
        setChartTitle(chartTitle);
        setChartData(getChartData(Data));
    };

    const isChartType = (value: unknown): value is ChartType => {
        return Object.values(ChartType).includes(value as ChartType);
    };

    const isRangeType = (value: unknown): value is RangeType => {
        return Object.values(RangeType).includes(value as RangeType);
    }

    const handleSelectChartType = (value: unknown) => {
        const chartType = getoneFromArray(value);
        if (chartType && typeof chartType === "string" && isChartType(chartType))
            changeChartType(chartType as ChartType);
    };

    const handleSelectRange = (value: unknown) => {
        const rangeType = getoneFromArray(value);
        if (rangeType && typeof rangeType === "string" && isRangeType(rangeType))
            setRangeType(rangeType as RangeType);
    };

    return (
        <div className="w-full h-full">
            <StatisticNav />
            <div className="flex flex-col md:flex-row justify-center md:justify-end w-full items-stretch -mb-6 mt-2">
                <div className="max-w-[500px] min-w-[300px] rounded-md flex justify-center items-center pb-2">
                    <SelectInput
                        data={selectRangeData}
                        placeholder="Select Range"
                        onChange={handleSelectRange}
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
