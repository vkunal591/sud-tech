"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useCallback, useEffect, useState } from "react";
import { Fetch } from "@/hooks/apiUtils";
import { DashboardEndpoint } from "@/data/endpoints";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart: React.FC = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "july",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [currency, setCurrency] = useState("INR");
  const [fetching, setFetched] = useState("loading");
  const [data, setData] = useState({ labels: months, datasets: [] });

  const fetchData = useCallback(async (params?: any) => {
    if (params && params?.currency)
      setCurrency(params.currency === "amount_INR" ? "INR" : "USD");
    try {
      setFetched("loading");
      const { data, success }: any = await Fetch(
        DashboardEndpoint["fetchGraphSale"],
        params
      );
      if (success) setData({ labels: months, datasets: data?.finalData });
    } catch (error) {
      console.log("fetchGraphSale error:", error);
    } finally {
      setFetched("done");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const options = {
    responsive: true,
    aspectRatio: 3,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 20,
          padding: 15,
          font: { size: 12 },
          color: "#333", // Text color
        },
      },
      title: {
        display: true,
        text: `Monthly Overview of Therapy wise revenue ${
          currency === "INR" ? "(in INR)" : "(in USD)"
        }`,
        font: { size: 18 },
        padding: { top: 0, bottom: 20 },
      },
    },
    scales: {
      x: {
        grid: { display: true },
        ticks: { font: { size: 12 } },
      },
      y: {
        grid: { color: "rgba(200, 200, 200, 0.3)" }, // Adds light horizontal grid lines
        ticks: {
          font: { size: 12 },
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div className="relative min-w-[980px] h-[400px] bg-white shadow-md rounded-md p-6">
      <div className="flex justify-end items-center gap-5 pb-5">
        <button
          disabled={fetching === "loading"}
          onClick={() => fetchData({ currency: "amount_INR" })}
          className={`border border-primary rounded-lg px-6 text-base py-1 font-medium ${
            currency === "INR"
              ? "bg-primary text-white"
              : "text-primary bg-white"
          }`}
        >
          In INR
        </button>
        <button
          disabled={fetching === "loading"}
          onClick={() => fetchData({ currency: "amount_USD" })}
          className={`border border-primary rounded-lg px-6 text-base py-1 font-medium ${
            currency === "USD"
              ? "bg-primary text-white"
              : "text-primary bg-white"
          }`}
        >
          In USD
        </button>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
