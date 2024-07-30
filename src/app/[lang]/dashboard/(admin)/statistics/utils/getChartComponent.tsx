import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import CohortAnalysisChart from "../components/CohortAnalysisChart";
import DoughnutChart from "../components/DoughnutChart";
import PieChart from "../components/PieChart";
import ScatterChart from "../components/ScatterPlotChart";
import {
  InfoMetricsPanelProps,
  isCAChartData,
  isChartData,
} from "../types/metrics-info.type";
import { ChartType } from "../types/chart-props.type";

const getChartComponent = (
  { chartData, chartType, chartText }: InfoMetricsPanelProps,
  size: "small" | "large",
) => {
  switch (chartType) {
    case ChartType.LINE:
      return (
        <LineChart
          chartData={isChartData(chartData) ? chartData : undefined}
          chartText={chartText}
        />
      );
    case ChartType.BAR:
      return (
        <BarChart
          chartData={isChartData(chartData) ? chartData : undefined}
          chartText={chartText}
        />
      );
    case ChartType.PIE:
      return (
        <PieChart
          chartData={isChartData(chartData) ? chartData : undefined}
          chartText={chartText}
        />
      );
    case ChartType.DOUGHNUT:
      return (
        <DoughnutChart
          chartData={isChartData(chartData) ? chartData : undefined}
          chartText={chartText}
        />
      );
    case ChartType.COHORT_ANALYSIS:
      return (
        <CohortAnalysisChart
          caChartData={isCAChartData(chartData) ? chartData : undefined}
          chartText={chartText}
          style={size === "small" ? { scale: 0.8 } : undefined}
        />
      );
    case ChartType.SCATTER_PLOT:
      return (
        <ScatterChart
          chartData={isChartData(chartData) ? chartData : undefined}
          chartText={chartText}
        />
      );
    default:
      return (
        <div className="h-full w-full flex flex-col justify-center items-center text-danger">
          <p>Chart type not supported!</p>
        </div>
      );
  }
};

export default getChartComponent;
