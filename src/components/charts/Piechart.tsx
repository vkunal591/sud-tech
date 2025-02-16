"use client";
import { Pie } from "react-chartjs-2";
import { Fetch } from "@/hooks/apiUtils";
import { useCallback, useEffect, useState } from "react";
import { DashboardEndpoint } from "@/data/endpoints";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC = () => {
  const [fetching, setFetched] = useState("loading");
  const [data, setData] = useState<any>({});

  const fetchData = useCallback(async (params?: any) => {
    try {
      setFetched("loading");
      const { data, success }: any = await Fetch(
        DashboardEndpoint["fetchGraphSessions"],
        params
      );
      if (success) setData(data);
    } catch (error) {
      console.log(fetching);
      console.log("fetchGraphSale error:", error);
    } finally {
      setFetched("done");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="grid grid-cols-2 w-full gap-10 items-center border shadow-lg p-5 rounded-2xl">
      {data?.upcoming && data?.upcoming.labels.length > 0 && (
        <div className="w-[450px]">
          <h2 className="text-2xl text-center mb-5 underline">
            Upcoming Sessions
          </h2>
          <Pie data={data?.upcoming} options={{ responsive: true }} />
        </div>
      )}
      {data?.completed && data?.completed.labels.length > 0 && (
        <div className="w-[450px]">
          <h2 className="text-2xl text-center mb-5 underline">
            Completed Sessions
          </h2>
          <Pie data={data?.completed} options={{ responsive: true }} />
        </div>
      )}
      {data?.rescheduled && data?.rescheduled.labels.length > 0 && (
        <div className="w-[450px]">
          <h2 className="text-2xl text-center mb-5 underline">
            Resheduled Sessions
          </h2>
          <Pie data={data?.rescheduled} options={{ responsive: true }} />
        </div>
      )}
      {data?.missed && data?.missed.labels.length > 0 && (
        <div className="w-[450px]">
          <h2 className="text-2xl text-center mb-5 underline">
            Missed Sessions
          </h2>
          <Pie data={data?.missed} options={{ responsive: true }} />
        </div>
      )}
    </div>
  );
};

export default PieChart;
