export type ChartData = {
  labels: (string | number)[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string;
    borderWidth: number;
  }[];
};

export type MetricsData = {
  id: string;
  title: string;
  content: string;
  XAxis: string;
  YAxis: string;
  legend: string;
  data: {
    year?: number;
    month?: number;
    week?: number;
    day?: number;
    value: number;
  }[];
  defaultChartType: ChartType;
};

export type DateRange = {
  startDate: string;
  endDate: string;
};

export type CAChartData = {
  weeks?: {
    [key: string]: number[];
  };
  days?: {
    [key: string]: number[];
  };
  months?: {
    [key: string]: number[];
  };
  years?: {
    [key: string]: number[];
  };
};

export type ChartOptions = {
  plugins: {
    title?: {
      display: boolean;
      text: string;
    };
    legend?: {
      display: boolean;
      position: string;
    };
  };
};

export type ChartProps = {
  chartData?: ChartData;
  caChartData?: CAChartData;
  chartOptions?: ChartOptions;
  label?: string;
  className?: string;
  chartText?: string;
};

export enum ChartType {
  LINE = "line",
  BAR = "bar",
  PIE = "pie",
  DOUGHNUT = "doughnut",
  COHORT_ANALYSIS = "cohort-analysis",
  SCATTER_PLOT = "scatter-plot",
  NONE = "none",
}

export enum RangeType {
  YEAR = "year",
  MONTH = "month",
  WEEK = "week",
  DAY = "day",
}

export type TRawChartData = {
  year: number;
  userGain: number;
};
