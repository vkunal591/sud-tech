import { debounce } from "@/hooks/general";

interface Paginate {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

interface PaginationProps {
  paginate: Paginate;
  fetchFilteredData: (params: { page: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  paginate,
  fetchFilteredData,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={debounce(
          () => fetchFilteredData({ page: paginate.currentPage - 1 }),
          100
        )}
        disabled={paginate.currentPage === 1}
        className="border border-primary text-iconBlack rounded-md px-4 py-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      <span className="font-semibold text-iconBlack">
        Showing {(paginate.currentPage - 1) * paginate.itemsPerPage + 1} to{" "}
        {paginate.totalItems < paginate.itemsPerPage * paginate.currentPage
          ? paginate.totalItems
          : paginate.itemsPerPage * paginate.currentPage}{" "}
        of {paginate.totalItems} entries
      </span>
      <button
        onClick={debounce(
          () => fetchFilteredData({ page: paginate.currentPage + 1 }),
          100
        )}
        disabled={paginate.currentPage === paginate.totalPages}
        className="border border-primary hover:bg-primary hover:text-white text-iconBlack rounded-md px-4 py-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
