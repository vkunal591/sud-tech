import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Registering required components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const BarChartWithNegativeYAxis: React.FC = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Current Year",
        data: [15, 25, 35, 45, 55, 60, 50, 70, 80, 90, 100, 110], // Current year data (positive)
        backgroundColor: "rgba(0, 123, 255, 0.8)", // Fill color for current year (teal)
        borderColor: "rgba(0, 123, 255, 0.8)", // Border color for current year (same as fill)
        borderWidth: 1,
      },
      {
        label: "Last Year",
        data: [-10, -20, -30, -40, -50, -60, -70, -80, -90, -100, -110, -120], // Last year data (negative)
        backgroundColor: "rgba(255, 165, 0, 1)", // Fill color for last year (red)
        borderColor: "rgba(255, 165, 0, 1)", // Border color for last year (same as fill)
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Comparison of Current Year and Last Year (12 Months)",
      },
    },
    scales: {
      x: {
        // The x-axis labels for months
        grid: {
          drawOnChartArea: true,
        },
      },
      y: {
        beginAtZero: true,
        stacked: true, // Enable stacking for the y-axis
        min: -150, // Minimum y-axis value to show both positive and negative data
        max: 150, // Maximum y-axis value to show both positive and negative data
      },
    },
  };

  return (
    <div className="w-full h-96 mt-5 bg-infobg rounded-xl p-5">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartWithNegativeYAxis;
