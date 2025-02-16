// components/BarChart.tsx
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  // Data for the bar chart with 3 different colors
  const data = {
    labels: ["Day 1", "Day 2", "Day 3"], // X-axis labels representing the days
    datasets: [
      {
        label: "Website Traffic", // Dataset label
        data: [12, 19, 10], // The traffic data for the bars
        backgroundColor: ["#017bff", "#e74c3c", "#f39c12"], // Blue, Red, Orange colors
        borderColor: ["#017bff", "#e74c3c", "#f39c12"], // Same colors for the borders
        borderWidth: 1, // Border width
      },
    ],
  };

  // Options for the chart with axis labels
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          // Custom tooltips if needed
        },
      },
    },
    scales: {
      x: {
        type: "category" as const, // Explicitly type this as 'category'
        beginAtZero: true,
        title: {
          display: true,
          text: "Days", // Label for X-axis
          font: {
            size: 14, // Font size for the label
            weight: "bold", // Font weight for the label
          },
        },
        barThickness: 40, // Adjust the thickness to make the bars closer
        categoryPercentage: 1, // Full width for each category
        barPercentage: 0.8, // Reduce the space between bars
      },
      y: {
        type: "linear" as const, // Explicitly type this as 'linear'
        beginAtZero: true,
        title: {
          display: true,
          text: "Traffic (Visitors)", // Label for Y-axis
          font: {
            size: 14, // Font size for the label
            weight: "bold", // Font weight for the label
          },
        },
      },
    },
  };

  return (
    <Bar data={data} options={options as ChartOptions<"bar">} height={400} />
  );
};

export default BarChart;
