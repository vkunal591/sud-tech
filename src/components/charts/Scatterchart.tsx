"use client";

import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ScatterChart: React.FC = () => {
  const data = {
    datasets: [
      {
        label: "Dataset 1",
        data: [
          { x: 10, y: 20 },
          { x: 15, y: 25 },
          { x: 30, y: 40 },
          { x: 50, y: 70 },
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [
          { x: 5, y: 10 },
          { x: 20, y: 30 },
          { x: 40, y: 50 },
          { x: 60, y: 80 },
        ],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return <Scatter data={data} options={{ responsive: true }} />;
};

export default ScatterChart;
