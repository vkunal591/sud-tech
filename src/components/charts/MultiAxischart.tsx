"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MultiAxisLineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Dataset 1",
        data: [50, 25, 75, 50, 90],
        borderColor: "rgb(255, 99, 132)",
        yAxisID: "y1",
      },
      {
        label: "Dataset 2",
        data: [30, 60, 40, 80, 60],
        borderColor: "rgb(54, 162, 235)",
        yAxisID: "y2",
      },
    ],
  };

  // const options = {
  //   responsive: true,
  //   scales: {
  //     y1: {
  //       type: "linear",
  //       position: "left",
  //     },
  //     y2: {
  //       type: "linear",
  //       position: "right",
  //     },
  //   },
  // };

  return <Line data={data} />;
};

export default MultiAxisLineChart;
