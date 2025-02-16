import { FormField } from "@/hooks/types";
import { formatDate } from "@/hooks/general";

export const PackingFormType: FormField[] = [
  {
    name: "quotationId",
    type: "select",
    required: true,
    label: "Select Quotation",
    placeholder: "Select Quotation ID",
    options: [], // This will hold the options for the Select component
  },
  {
    name: "warehouseId",
    type: "select",
    required: true,
    label: "Select Warehouse",
    placeholder: "Select Warehouse",
    options: [], // This will hold the options for the Select component
  },
  {
    type: "select",
    name: "packedBy",
    required: true,
    label: "Packed by",
    placeholder: "Enter packed by",
    options: [], // This will hold the options for the Select component
  },
  {
    name: "packingDate",
    type: "date",
    required: true,
    label: "Estimated Packed Date",
    minDate: formatDate(new Date()),
    placeholder: "Select Packed Date",
  },
  {
    type: "text",
    required: true,
    label: "Customer",
    name: "customerName",
    placeholder: "Enter Customer Name",
  },
  {
    maxLength: 6,
    type: "stringNumeric",
    name: "totalQuantity",
    label: "Total Quantity",
    placeholder: "Enter total quantity",
  },
  {
    maxLength: 6,
    required: true,
    isDisabled: true,
    type: "stringNumeric",
    name: "netPackedQuantity",
    label: "Net Packed Quantity",
    placeholder: "Enter packed quantity",
  },
  {
    name: "transport",
    type: "text",
    required: false,
    label: "Transport",
    placeholder: "Enter Transport Details",
  },
  {
    name: "remarks",
    type: "text",
    required: false,
    label: "Remarks",
    placeholder: "Enter Remarks",
  },
  {
    name: "packing",
    type: "packing",
    widthFull: true,
    label: "Packing Management",
    options: [],
  },
];
