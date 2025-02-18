import React from "react";
import { bigShoulders } from "@/font/font";

const RevenueData = ({ data }: { data: any }) => {
  const monthNames = [
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Revenue */}
      <div className="bg-blue-100 p-6 rounded-xl">
        <h3
          className={`text-2xl pb-2 font-black uppercase text-blue-700 ${bigShoulders.className}`}
        >
          Total Revenue
        </h3>
        <p className="text-3xl font-bold text-gray-800">
          ₹ {data?.totalRevenue.toLocaleString()}
        </p>
        <p className="text-gray-500">Since the beginning</p>
      </div>

      {/* Current Month Revenue */}
      <div className="bg-green-100 p-6 rounded-xl">
        <h3
          className={`text-2xl pb-2 font-black uppercase text-green-700 ${bigShoulders.className}`}
        >
          Current Month Revenue
        </h3>
        <p className="text-3xl font-bold text-gray-800">
          ₹ {data.currentMonthRevenue.toLocaleString()}
        </p>
        <p className="text-gray-500">This month&apos;s total</p>
      </div>

      {/* Monthly Revenue Data */}
      <div className="bg-yellow-100 p-6 rounded-xl">
        <h3
          className={`text-2xl pb-2 font-black uppercase text-yellow-700 ${bigShoulders.className}`}
        >
          Monthly Revenue
        </h3>
        <ul className="space-y-4 mt-4">
          {data.monthlyData.map((monthData: any, index: number) => (
            <li key={index} className="flex justify-between text-gray-800">
              <span className="font-medium text-base">
                {monthNames[monthData.month - 1]}:
              </span>
              <span>₹ {monthData.monthlyRevenue.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RevenueData;
