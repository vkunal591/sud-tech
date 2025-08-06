import dayjs from "dayjs";
import { FaFilePdf } from "react-icons/fa";

const TableData = ({ updatedData, handleDownloadPDF }:any) => {
  const columns = [
    { key: "serviceDate", label: "Service Date", sortable: true, isDate: true },
    { key: "vesselName", label: "Vessel Name", sortable: true },
    { key: "vesselImoNo", label: "Vessel IMO No", sortable: true },
    { key: "jobDescription", label: "Job Description", sortable: true },
    { key: "port", label: "Port", sortable: true },
    { key: "mt", label: "MT", sortable: true },
    { key: "subject", label: "Subject", sortable: true },
    { key: "invoiceDate", label: "Invoice Date", sortable: true, isDate: true },
    { key: "status", label: "Status", sortable: true, isStatus: true },
    { key: "invoiceNumber", label: "Invoice Number", sortable: true },
    { key: "orderNumber", label: "Order Number", sortable: true },
    { key: "invoiceTo", label: "Invoice To", sortable: true },
    { key: "careOf", label: "Care Of", sortable: true },
    { key: "address", label: "Address", sortable: true },
    { key: "totalAmount", label: "Total Amount", sortable: true, isCurrency: "$" },
    { key: "paymentDueDate", label: "Payment Due Date", sortable: true, isDate: true },
    { key: "actualPaymentAmount", label: "Actual Payment Amount", sortable: true, isCurrency: "$" },
    { key: "actualPaymentDate", label: "Actual Payment Date", sortable: true, isDate: true },
    { key: "remarks", label: "Remarks", sortable: true },
    { key: "companyName", label: "Company Name", sortable: true },
  ];

  return (
    <div className="overflow-x-auto no-scrollbar">
      <table className="w-full mt-4 text-sm">
        <thead className="text-base text-iconBlack text-left">
          <tr>
            <th className="p-4 border border-infobg">Sr. No.</th>
            {columns.map((col) => (
              <th key={col.key} className="p-4 border border-infobg">{col.label}</th>
            ))}
            <th className="p-4 border border-infobg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {updatedData &&
            updatedData.map((deal:any, index:any) => (
              <tr
                key={deal._id}
                className="border-b border-infobg text-iconBlack hover:bg-infobg cursor-pointer"
              >
                <td className="p-4 border border-infobg">{index + 1}</td>
                
                {columns.map((col) => {
                  let value = deal[col.key];

                  // Format date fields
                  if (col.isDate && value) {
                    value = dayjs(value).format("DD-MM-YYYY");
                  }

                  // Format currency fields
                  if (col.isCurrency && value !== undefined && value !== null) {
                    value = `${col.isCurrency} ${Number(value).toFixed(2)}`;
                  }

                  // Format status field (you can customize this as you need)
                  if (col.isStatus) {
                    const statusColor =
                      value === "Unpaid"
                        ? "bg-green-400"
                        : value === "Paid"
                        ? "bg-yellow-400"
                        : "bg-red-400";

                    return (
                      <td key={col.key} className="p-4 border border-infobg">
                        <span
                          className={`px-2 py-1 text-xs text-white rounded ${statusColor}`}
                        >
                          {value}
                        </span>
                      </td>
                    );
                  }

                  // Default render
                  return (
                    <td key={col.key} className="p-4 border border-infobg">
                      {value ?? "-"}
                    </td>
                  );
                })}
                <td className="p-4 border border-infobg">
                  <button
                    onClick={() => handleDownloadPDF(deal)}
                    className="bg-green-400 text-white rounded text-lg p-1 hover:text-green-800"
                  >
                    <FaFilePdf />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
