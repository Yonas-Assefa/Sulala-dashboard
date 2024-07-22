import { CAChartData, ChartData, ChartType } from "./chart-props.type";

export type InfoMetricsPanelProps = {
  chartData?: ChartData;
  caChartData?: CAChartData;
  chartType: ChartType;
  chartText?: string;
  onClick?: (id: string) => void;
  id?: string;
};
