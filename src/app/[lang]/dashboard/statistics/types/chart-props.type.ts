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
