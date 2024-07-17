"use client";
import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Pie, Bar, Line, Doughnut, Scatter } from "react-chartjs-2";
import CohortGraph from "react-cohort-graph";

export const Data = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];

Chart.register(CategoryScale);

function PieChart({ chartData }: { chartData: any }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
          },
        }}
      />
    </div>
  );
}

const BarChart = ({ chartData }: { chartData: any }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

function LineChart({ chartData }: { chartData: any }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

function DoughnutChart({ chartData }: { chartData: any }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Doughnut Chart</h2>
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
          },
        }}
      />
    </div>
  );
}

function ScatterChart({ chartData }: { chartData: any }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Scatter Chart</h2>
      <Scatter
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
          },
        }}
      />
    </div>
  );
}

function CohortAnalysisChart() {
  return (
    <div className="App">
      <p>Monthly</p>
      <CohortGraph
        data={{
          weeks: {
            "01_03_2022-31_03_2022": [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3],
            "01_04_2022-30_04_2022": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            "01_05_2022-31_05_2022": [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            "01_06_2022-30_06_2022": [7, 7, 7, 6, 6, 5, 6, 4, 1],
            "01_07_2022-31_07_2022": [6, 7, 5, 5, 4, 3, 5, 0],
            "01_08_2022-31_08_2022": [1, 0, 1, 0, 0, 0, 0],
            "01_09_2022-30_09_2022": [10, 10, 9, 9, 8, 4],
            "01_10_2022-31_10_2022": [3, 2, 3, 2, 0],
            "01_11_2022-30_11_2022": [4, 1, 2, 0],
            "01_12_2022-31_12_2022": [2, 2, 1],
            "01_01_2023-31_01_2023": [12, 4],
            "01_02_2023-28_02_2023": [1],
          },
        }}
      />
    </div>
  );
}

function page() {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
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
  });

  return (
    <div className="w-full">
      <PieChart chartData={chartData} />
      <BarChart chartData={chartData} />
      <LineChart chartData={chartData} />
      <DoughnutChart chartData={chartData} />
      <ScatterChart chartData={chartData} />
      <CohortAnalysisChart />
    </div>
  );
}

export default page;
