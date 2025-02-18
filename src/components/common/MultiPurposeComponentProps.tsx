import React from "react";

interface MultiPurposeComponentProps {
  _id: any;
  text: string;
  type: "label" | "button" | "select";
  onClick?: any; // Click handler for button
  options?: string[]; // Options for select dropdown
  onSelectChange?: any; // Handler for select change
}

const colorMapping: Record<string, string> = {
  High: "bg-red-600",
  New: "bg-blue-500",
  Low: "bg-green-500",
  Sent: "bg-blue-400",
  false: "bg-red-500",
  true: "bg-green-500",
  Urgent: "bg-red-700",
  Draft: "bg-gray-500",
  Unpaid: "bg-red-500",
  Paid: "bg-green-500",
  Failed: "bg-red-500",
  Medium: "bg-red-500",
  Company: "bg-green-500",
  Default: "bg-gray-500",
  Rejected: "bg-red-500",
  Refunded: "bg-blue-500",
  Cancelled: "bg-red-500",
  Received: "bg-blue-500",
  Individual: "bg-blue-500",
  Accepted: "bg-green-500",
  Pending: "bg-yellow-500",
  Approved: "bg-green-500",
  Overdue: "bg-purple-500",
  Contacted: "bg-green-700",
  InProgress: "bg-teal-500",
  Converted: "bg-green-500",
  Completed: "bg-green-500",
};

const MultiPurposeComponent: React.FC<MultiPurposeComponentProps> = ({
  _id,
  type,
  text,
  onClick,
  options = [],
  onSelectChange,
}) => {
  const commonStyles = `px-4 py-2 rounded-lg text-white uppercase flex items-center justify-center text-xs font-bold`;

  const selectValue = options.includes(text) ? text : "";

  switch (type) {
    case "label":
      return (
        <span
          className={`${commonStyles} ${
            colorMapping[text] || colorMapping["Default"]
          }`}
        >
          {text}
        </span>
      );

    case "button":
      return (
        <button
          className={`${commonStyles} ${
            colorMapping[text] || colorMapping["Default"]
          } cursor-pointer hover:opacity-90`}
          onClick={() => onClick({ _id: _id })}
        >
          {text}
        </button>
      );

    case "select":
      return (
        <div className="relative w-full">
          <select
            value={selectValue}
            className={`${commonStyles} w-full appearance-none outline-none relative pr-8 ${
              colorMapping[text] || colorMapping["Default"]
            } text-black`}
            onChange={(e) =>
              onSelectChange &&
              onSelectChange({ _id: _id, status: e.target.value })
            }
          >
            <option value="" disabled>
              --Select--
            </option>
            {options.map((option, index) => (
              <option
                key={index}
                value={option}
                disabled={option === selectValue}
              >
                {option}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 text-white right-2 flex items-center pointer-events-none">
            ▼
          </span>
        </div>
      );

    default:
      return null;
  }
};

export default MultiPurposeComponent;
