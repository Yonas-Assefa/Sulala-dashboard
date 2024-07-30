import { CAChartData, ChartData, ChartType } from "./chart-props.type";

export type InfoMetricsPanelProps = {
  chartData?: ChartData | CAChartData;
  chartType: ChartType;
  chartText?: string;
  onClick?: (id: string) => void;
  id?: string;
  isSelected?: boolean;
};

export const isCAChartData = (data: unknown): data is CAChartData => {
  return (data as CAChartData).weeks !== undefined;
};

export const isChartData = (data: unknown): data is ChartData => {
  return (data as ChartData).datasets !== undefined;
};
