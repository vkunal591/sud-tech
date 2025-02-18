import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
} from "chart.js";

// Registering required chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// interface ConcentricCircleGraphProps {}

const ConcentricCircleGraph = () => {
  // Data for the concentric circles
  const data = {
    labels: ["Blue", "Red", "Orange"], // Labels for each segment
    datasets: [
      {
        data: [40, 20, 30], // Values for each concentric ring
        backgroundColor: [
          "rgba(0, 123, 255, 1)", // Blue
          "rgba(255, 0, 0, 1)", // Red
          "rgba(255, 165, 0, 1)", // Orange
        ],
        borderWidth: 0, // No border
        cutout: "50%", // Hole in the center for the first ring
      },
      {
        data: [60, 30, 40], // Values for the second, outer concentric ring
        backgroundColor: [
          "rgba(0, 123, 255, 0.6)", // Lighter Blue
          "rgba(255, 0, 0, 0.6)", // Lighter Red
          "rgba(255, 165, 0, 0.6)", // Lighter Orange
        ],
        borderWidth: 0, // No border
        cutout: "80%", // Larger hole for the second ring
      },
    ],
  };

  // Chart.js options configuration
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false, // Disable tooltips
      },
      legend: {
        display: false, // Hide the legend
      },
      title: {
        display: false, // Hide the title
      },
    },
    elements: {
      arc: {
        borderWidth: 0, // Remove the border around arcs
      },
    },
    // Removed scales as it's not necessary for doughnut charts
  };

  return (
    <div className="w-full h-80 sm:h-96 bg-whiteBg">
      <Doughnut data={data} options={options as ChartOptions<"doughnut">} />
    </div>
  );
};

export default ConcentricCircleGraph;
