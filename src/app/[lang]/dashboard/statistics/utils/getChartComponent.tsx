import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import CohortAnalysisChart from "../components/CohortAnalysisChart";
import DoughnutChart from "../components/DoughnutChart";
import PieChart from "../components/PieChart";
import ScatterChart from "../components/ScatterPlotChart";
import { InfoMetricsPanelProps } from "../types/metrics-info.type";
import { ChartType } from "../types/chart-props.type";

const getChartComponent = ({
  caChartData,
  chartData,
  chartType,
  chartText,
}: InfoMetricsPanelProps) => {
  switch (chartType) {
    case ChartType.LINE:
      return <LineChart chartData={chartData} chartText={chartText} />;
    case ChartType.BAR:
      return <BarChart chartData={chartData} chartText={chartText} />;
    case ChartType.PIE:
      return <PieChart chartData={chartData} chartText={chartText} />;
    case ChartType.DOUGHNUT:
      return <DoughnutChart chartData={chartData} chartText={chartText} />;
    case ChartType.COHORT_ANALYSIS:
      return (
        <CohortAnalysisChart caChartData={caChartData} chartText={chartText} />
      );
    case ChartType.SCATTER_PLOT:
      return <ScatterChart chartData={chartData} chartText={chartText} />;
    default:
      return (
        <div className="h-full w-full flex flex-col justify-center items-center text-danger">
          <p>Chart type not supported!</p>
        </div>
      );
  }
};

export default getChartComponent;
