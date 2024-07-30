import { TRawChartData } from "../types/chart-props.type";

const getChartData = (data: TRawChartData[]) => {
  return {
    labels: data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
};

export default getChartData;
