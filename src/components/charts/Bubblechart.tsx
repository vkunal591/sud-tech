"use client";

import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const BubbleChart: React.FC = () => {
  const data = {
    datasets: [
      {
        label: "Dataset 1",
        data: [
          { x: 20, y: 30, r: 15 },
          { x: 40, y: 10, r: 10 },
          { x: 25, y: 50, r: 25 },
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [
          { x: 35, y: 25, r: 20 },
          { x: 15, y: 60, r: 12 },
          { x: 55, y: 45, r: 30 },
        ],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return <Bubble data={data} options={{ responsive: true }} />;
};

export default BubbleChart;
