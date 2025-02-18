import React from "react";
import { debounce } from "chart.js/helpers";
import { BsFilterLeft } from "react-icons/bs";
import { FilterOption } from "@/hooks/types";

interface SearchFilterProps {
  handleSearch: any;
  searchTerm: string;
  filterOptions: FilterOption[];
  setSearchTerm: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  handleSearch,
  setSearchTerm,
  filterOptions,
}) => {
  const [selectedOption, setSelectedOption] = React.useState(
    Array.isArray(filterOptions) && filterOptions.length > 0
      ? filterOptions[0]?.value
      : ""
  );

  const handleSearchClick = () => {
    handleSearch(searchTerm, selectedOption);
  };

  return (
    <div>
      <p className="flex text-iconBlack font-medium gap-2 items-center pb-1">
        <BsFilterLeft size={25} /> Filters
      </p>
      <div className="flex">
        {filterOptions && filterOptions?.length > 0 && (
          <select
            className="rounded-l-xl border border-r-0 outline-none focus:outline-none bg-whiteBg text-iconBlack border-secondary p-2"
            value={selectedOption}
            onChange={(e) => {
              setSearchTerm("");
              setSelectedOption(e.target.value);
            }}
          >
            {filterOptions.map((option) =>
              option.value ? (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ) : null
            )}
          </select>
        )}
        <input
          type="text"
          value={searchTerm}
          placeholder="Search here..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${
            filterOptions && filterOptions.length > 0
              ? "border border-l-0 rounded-xl rounded-l-none focus:ring-0"
              : "border rounded-xl focus:ring-2 focus:ring-primary/50"
          } px-4 text-lg bg-whiteBg text-iconBlack py-2 placeholder:text-iconBlack outline-none border-secondary w-full`}
        />
        <button
          type="button"
          className="border px-4 ml-2 text-lg py-2 rounded-xl text-iconBlack border-secondary bg-whiteBg"
          onClick={debounce(handleSearchClick, 1000)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
