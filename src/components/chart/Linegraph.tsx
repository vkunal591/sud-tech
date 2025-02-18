import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
);

const LineGraph = ({ borderColor }: { borderColor: string }) => {
  const data = [20, 25, 15, 35, 20, 30, 15];
  const chartData = {
    labels: data.map((_, index) => `Point ${index + 1}`), // Label each point
    datasets: [
      {
        data,
        fill: false, // No area fill under the line
        borderColor: borderColor, // COlor
        pointRadius: 0, // Hide points
        pointHoverRadius: 0, // Hide points on hover
        borderWidth: 3, // Slightly thicker line
        tension: 0.4, // Smooth curves
      },
    ],
  };

  // Chart.js options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: true, // Show tooltips with values
        callbacks: {
          label: (context: any) => `Value: ${context.raw}`, // Show values in tooltips
        },
      },
    },
    layout: {
      padding: {
        top: 10, // Add padding above the chart
        bottom: 10, // Add padding below the chart
      },
    },
    scales: {
      x: {
        display: false, // Hide x-axis
        grid: {
          display: false, // Remove x-axis grid lines
        },
      },
      y: {
        display: false, // Hide y-axis
        grid: {
          display: false, // Remove y-axis grid lines
        },
      },
    },
  };

  return (
    <div className="w-full h-20 bg-whiteBg">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineGraph;
