import React from "react";

function page() {
  return <div>page</div>;
}

export default page;

// import React from "react";
// import {
//   // ArcElement,
//   BarElement,
//   // CategoryScale,
//   Chart,
//   // Filler,
//   // Legend,
//   // LineElement,
//   // LinearScale,
//   // PointElement,
//   // RadialLinearScale,
//   // Title,
//   // Tooltip,
// } from "chart.js";

// import {
//   // Line,
//   Bar,
//   // Doughnut,
//   // Scatter
// } from "react-chartjs-2";

// export const registerCharts = () => {
//   Chart.register(
//     // ArcElement,
//     BarElement,
//     // CategoryScale,
//     // Legend,
//     // LineElement,
//     // LinearScale,
//     // PointElement,
//     // Title,
//     // Tooltip,
//     // RadialLinearScale,
//     // Filler
//   );
// };

// // const LineChart = () => {
// //   const options = {
// //     responsive: true,
// //     plugins: {
// //       legend: {
// //         position: "top" as const,
// //       },
// //       title: {
// //         display: true,
// //         text: "Line Chart: Monthly Sales Trend for Products A & B",
// //       },
// //     },
// //   }

// //   const labels = ["January", "February", "March", "April", "May", "June", "July"]

// //   const productASales = [120, 135, 125, 145, 160, 150, 170]

// //   const productBSales = [80, 75, 95, 100, 110, 105, 120, 115]

// //   const data = {
// //     labels,
// //     datasets: [
// //       {
// //         label: "Product A Sales",
// //         data: productASales,
// //         borderColor: "rgb(255, 99, 132)",
// //         backgroundColor: "rgba(255, 99, 132)",
// //       },
// //       {
// //         label: "Product B Sales",
// //         data: productBSales,
// //         borderColor: "rgb(53, 162, 235)",
// //         backgroundColor: "rgba(53, 162, 235)",
// //       },
// //     ],
// //   }

// //   return <Line options={options} data={data} />
// // }

// const BarChart = () => {
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top" as const,
//       },
//       title: {
//         display: true,
//         text: "Bar Chart: Quarterly Revenue & Expenses Comparison",
//       },
//     },
//   };

//   const labels = [
//     "Product A",
//     "Product B",
//     "Product C",
//     "Product D",
//     "Product E",
//   ];
//   const data1 = [45, 75, 55, 90, 60];
//   const data2 = [65, 40, 70, 80, 50];

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Q1 Sales",
//         data: data1,
//         backgroundColor: "rgba(75, 192, 192)",
//         borderColor: "rgb(75, 192, 192)",
//         borderWidth: 1,
//       },
//       {
//         label: "Q2 Sales",
//         data: data2,
//         backgroundColor: "rgba(255, 159, 64)",
//         borderColor: "rgb(255, 159, 64)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   return <Bar options={options} data={data} />;
// };

// // const DoughnutChart = () => {
// //   const labels = ["January", "February", "March", "April", "May", "June", "July"]
// //   const dataValues = [100, 50, 80, 60, 70, 40, 90]

// //   const data = {
// //     labels,
// //     datasets: [
// //       {
// //         data: dataValues,
// //         backgroundColor: [
// //           "rgba(255, 99, 132)",
// //           "rgba(53, 162, 235)",
// //           "rgba(255, 206, 86)",
// //           "rgba(75, 192, 192)",
// //           "rgba(153, 102, 255)",
// //           "rgba(255, 159, 64)",
// //           "rgba(201, 203, 207)",
// //         ],
// //         borderColor: [
// //           "rgb(255, 99, 132)",
// //           "rgb(53, 162, 235)",
// //           "rgb(255, 206, 86)",
// //           "rgb(75, 192, 192)",
// //           "rgb(153, 102, 255)",
// //           "rgb(255, 159, 64)",
// //           "rgb(201, 203, 207)",
// //         ],
// //         borderWidth: 1,
// //       },
// //     ],
// //   }

// //   const options = {
// //     responsive: true,
// //     maintainAspectRatio: true,
// //     aspectRatio: 2,
// //     plugins: {
// //       legend: {
// //         position: "top" as const,
// //       },
// //       title: {
// //         display: true,
// //         text: "Doughnut Chart: Monthly Sales",
// //       },
// //     },
// //   }

// //   return <Doughnut data={data} options={options} />
// // }

// // const ScatterChart = () => {
// //   const labels = ["January", "February", "March", "April", "May", "June", "July"]
// //   const dataPoints = [
// //     { x: 20, y: 80 },
// //     { x: 30, y: 70 },
// //     { x: 50, y: 60 },
// //     { x: 40, y: 50 },
// //     { x: 70, y: 40 },
// //     { x: 60, y: 30 },
// //     { x: 90, y: 20 },
// //   ]

// //   const data = {
// //     labels,
// //     datasets: [
// //       {
// //         label: "Scatter Chart: Monthly Sales vs Expenses",
// //         data: dataPoints,
// //         backgroundColor: "rgba(53, 162, 235)",
// //         borderColor: "rgb(53, 162, 235)",
// //         borderWidth: 1,
// //         pointRadius: 5, // Adjust the size of the points
// //       },
// //     ],
// //   }

// //   const options = {
// //     responsive: true,
// //     scales: {
// //       x: {
// //         beginAtZero: true,
// //         title: {
// //           display: true,
// //           text: "Sales",
// //         },
// //       },
// //       y: {
// //         beginAtZero: true,
// //         title: {
// //           display: true,
// //           text: "Expenses",
// //         },
// //       },
// //     },
// //     plugins: {
// //       legend: {
// //         position: "top" as const,
// //       },
// //       title: {
// //         display: true,
// //         text: "Monthly Sales vs Expenses Scatter Plot",
// //       },
// //     },
// //   }

// //   return <Scatter data={data} options={options} />
// // }

// function page() {
//   return null;
//   React.useEffect(() => {
//     registerCharts();
//   }, []);
//   return (
//     <div className="container">
//       <h1>React charts examples</h1>
//       {/* <div className="graph-container">
//         <LineChart />
//       </div> */}
//       <div className="graph-container">
//         <BarChart />
//       </div>
//       {/*
//       <div className="graph-container">
//         <DoughnutChart />
//       </div>
//       <div className="graph-container">
//         <ScatterChart />
//       </div> */}
//     </div>
//   );
// }

// export default page;
