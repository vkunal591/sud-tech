"use client";

import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const MixedChart: React.FC = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        type: "bar" as const,
        label: "Bar Dataset",
        data: [10, 20, 30, 40, 50],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        type: "line" as const,
        label: "Line Dataset",
        data: [15, 25, 35, 45, 55],
        borderColor: "rgba(54, 162, 235, 0.5)",
        fill: false,
      },
    ],
  };

  return <Chart type="bar" data={data} options={{ responsive: true }} />;
};

export default MixedChart;
