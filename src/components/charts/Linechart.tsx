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
import { Fetch } from "@/hooks/apiUtils";
import { useCallback, useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart: React.FC = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [fetching, setFetched] = useState("loading");
  const [data, setData] = useState<any>({ labels: months, datasets: [] });

  const fetchData = useCallback(async (params?: any) => {
    try {
      setFetched("loading");
      const url = "admin/dashboard/transactions";
      const { data, success }: any = await Fetch(
        url,
        params,
        5000,
        true,
        false
      );
      if (success) {
        if (data?.datasets[0] && data?.datasets[0]?.data.length > 12)
          setData({
            labels: Array.from(
              { length: data?.datasets[0]?.data.length },
              (_, i) => i + 1
            ),
            datasets: data?.datasets,
          });
        else setData({ labels: months, datasets: data?.datasets });
      }
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
          font: { size: 14 },
          color: "#333", // Text color
        },
      },
      title: {
        display: true,
        text: "Monthly Overview of Revenue",
        font: { size: 18 },
        padding: { top: 0, bottom: 20 },
      },
    },
    scales: {
      x: {
        grid: { display: true },
        ticks: { font: { size: 14 } },
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
    <>
      <div
        className={`relative w-full h-[400px] bg-white mt-6 ${
          fetching === "done" && "mb-16"
        }`}
      >
        {fetching === "loading" && (
          <div className="absolute inset-0 bg-gray-200 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-wave"></div>
          </div>
        )}
        {fetching === "done" && (
          <>
            <div className="flex justify-end items-center gap-5 pb-5">
              <select
                onChange={(e) => {
                  if (parseInt(e.target.value) === 0) fetchData({});
                  else fetchData({ month: e.target.value });
                }}
                className={`border border-primary focus:ring-2 focus:ring-primary outline-none rounded-lg px-6 text-base py-2 font-medium`}
              >
                <option value={0}>Overall</option>
                {months.map((month, idx) => {
                  return (
                    <option key={idx} value={idx + 1}>
                      {month}
                    </option>
                  );
                })}
              </select>
            </div>
            <Line data={data} options={options} />
          </>
        )}
      </div>
    </>
  );
};

export default LineChart;
