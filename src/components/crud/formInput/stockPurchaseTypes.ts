import { formatDate } from "@/hooks/general";
import { FormField } from "@/hooks/types";

export const StockPurchaseTypes: FormField[] = [
  {
    type: "date",
    required: true,
    name: "issueDate",
    label: "Issue Date",
    minDate: formatDate(new Date()),
    placeholder: "Enter issue date",
  },
  {
    name: "issueTo",
    required: true,
    type: "select",
    label: "Warehouse (To)",
    placeholder: "Select warehouse (To)",
    options: [],
  },
  {
    type: "select",
    required: true,
    name: "issueFrom",
    label: "Warehouse (From)",
    placeholder: "Select Warehouse (From)",
    options: [],
  },
  {
    name: "referenceNo",
    type: "text",
    label: "Reference Number",
    placeholder: "Enter reference number",
  },
  {
    type: "text",
    name: "remarks",
    label: "Remarks (Optional)",
    placeholder: "Enter remarks (Optional)",
  },
  {
    min: 0,
    name: "totalQuantity",
    type: "number",
    isDisabled: true,
    label: "Total Quantity",
    placeholder: "0.0",
  },
  {
    name: "totalValue",
    type: "number",
    isDisabled: true,
    label: "Total Value",
    placeholder: "0.0",
    min: 0,
  },
  {
    name: "netAmount",
    type: "number",
    isDisabled: true,
    label: "Net Amount",
    placeholder: "0.0",
    min: 0,
  },
  {
    name: "stockTransferForm",
    type: "stockTransferForm",
    widthFull: true,
    label: "Stock Transfer Management",
    options: [],
  },
];
