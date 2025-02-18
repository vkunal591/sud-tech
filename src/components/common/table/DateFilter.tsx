import React from "react";

interface DateFilterProps {
  endDate: string;
  startDate: string;
  setEndDate: (value: string) => void;
  setStartDate: (value: string) => void;
  fetchFilteredData: (params: { start?: string; end?: string }) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  endDate,
  startDate,
  setEndDate,
  setStartDate,
  fetchFilteredData,
}) => {
  return (
    <div className="flex space-x-2">
      <div className="flex flex-col gap-1">
        <label className="text-iconBlack font-medium">Start Time:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            const value = e.target.value;
            setStartDate(value);
            if (endDate) fetchFilteredData({ start: value });
          }}
          max={endDate}
          className="border px-4 text-lg py-2 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-iconBlack bg-whiteBg border-secondary"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-iconBlack font-medium">End Time:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            const value = e.target.value;
            setEndDate(value);
            if (startDate) fetchFilteredData({ end: value });
          }}
          min={startDate}
          className="border px-4 text-lg py-2 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-iconBlack bg-whiteBg border-secondary"
        />
      </div>
    </div>
  );
};

export default DateFilter;
