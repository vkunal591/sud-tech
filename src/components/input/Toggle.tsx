import React, { FC, useState } from "react";

interface ToggleButtonProps {
  setState: any;
  keyUpdate?: any;
  field: {
    name: string;
    label: string;
    value?: boolean;
    required?: boolean;
  };
}

const ToggleButton: FC<ToggleButtonProps> = ({
  field,
  setState,
  keyUpdate,
}) => {
  const [active, setActive] = useState<boolean>(field.value ?? false);

  const handleClick = () => {
    const newActiveState = !active;
    setActive(newActiveState);
    if (keyUpdate) setState(newActiveState);
    else if (field?.name)
      setState((prev: Record<string, boolean>) => ({
        ...prev,
        [field.name]: newActiveState,
      }));
  };

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={field.name}
        className="block font-medium text-gray-700 mb-3"
      >
        {field.label}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex gap-5 items-center">
        <span className={`font-semibold text-black`}>Active</span>
        <button
          type="button"
          onClick={handleClick}
          className={`relative w-16 h-8 rounded-full focus:outline-none transition-all duration-300 ${
            active ? "bg-green-500" : "bg-red-600"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
              active ? "translate-x-8" : "translate-x-0"
            }`}
          ></span>
        </button>
        <span className={`font-semibold text-black`}>InActive</span>
      </div>
    </div>
  );
};

export default ToggleButton;
