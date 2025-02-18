import { FaFilter } from "react-icons/fa";
import { debounce } from "@/hooks/general";
import GenerateExcelButton from "../GenerateExcel";

interface HeaderProps {
  type: string;
  suffix?: string;
  filteredData: any[];
  handleReset: () => void;
  handleAdd: () => void;
  operationsAllowed: {
    create?: boolean;
    [key: string]: boolean | undefined;
  };
}

const Header: React.FC<HeaderProps> = ({
  type,
  suffix,
  handleAdd,
  handleReset,
  filteredData,
  operationsAllowed,
}) => {
  return (
    <div className="flex bg-whiteBg p-5 rounded-2xl justify-between items-center">
      {/* Title */}
      <h2 className="text-3xl text-iconBlack font-semibold w-fit">
        All {type} <span className="font-normal text-xl">{suffix}</span>
      </h2>

      {/* Actions */}
      <div className="space-x-2 flex">
        {/* Export to Excel */}
        <GenerateExcelButton data={filteredData} />

        {/* Clear Filters Button */}
        <button
          type="button"
          onClick={debounce(handleReset, 1000)}
          className="bg-secondary text-white flex gap-2 justify-center items-center outline-none px-4 text-lg py-2 rounded-xl"
        >
          Clear filters <FaFilter className="text-sm" />
        </button>

        {/* Add Button */}
        {operationsAllowed?.create && (
          <button
            type="button"
            onClick={handleAdd}
            className="bg-secondary text-white px-4 py-1 rounded-xl"
          >
            Add {type}
            <sup>+</sup>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
