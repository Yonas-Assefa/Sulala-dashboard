"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Radar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: ["red", "blue", "yellow"],
      borderColor: ["red", "blue", "yellow"],
      borderWidth: 1,
    },
  ],
};

function page() {
  return (
    <div>
      <p className="text-black">Stat graph here</p>
      <Radar data={data} />
    </div>
  );
}

export default page;
