import { formatDate } from "@/hooks/general";
import { FormField } from "@/hooks/types";

export const BillingFormType: FormField[] = [
  {
    type: "text",
    required: true,
    name: "invoiceNumber",
    label: "Invoice Number",
    placeholder: "Enter Invoice Number",
  },
  {
    type: "select",
    required: true,
    name: "invoiceType",
    label: "Invoice Type",
    placeholder: "Select Invoice Type",
    options: [
      { label: "PORTS", value: "PORTS" },
      { label: "DOCK", value: "DOCK" },
    ],
  },
  {
    type: "date",
    required: true,
    name: "invoiceDate",
    label: "Invoice Date",
    minDate: formatDate(new Date()),
    placeholder: "Select Invoice Date",
  },
  {
    type: "text",
    name: "vesselName",
    label: "Vessel Name",
    placeholder: "Enter Vessel Name",
  },
  {
    type: "text",
    name: "vesselImoNo",
    label: "Vessel IMO Number",
    placeholder: "Enter Vessel IMO Number",
  },
  {
    type: "text",
    name: "co",
    label: "C/O",
    placeholder: "Enter C/O",
  },
  {
    type: "text",
    name: "to",
    label: "To",
    placeholder: "Enter Company Name",
  },
  {
    type: "date",
    name: "dueDate",
    label: "Due Date",
    placeholder: "Select Due Date",
  },
  {
    type: "date",
    name: "yardPaymentDueDate",
    label: "Yard Payment Due Date",
    placeholder: "Select Yard Payment Due Date",
  },
  {
    type: "number",
    name: "totalAmount",
    label: "Total Amount",
    placeholder: "Enter Total Amount",
  },
  {
    type: "text",
    name: "totalAmountInWords",
    label: "Total Amount in Words",
    placeholder: "Enter Total Amount in Words",
  },
  {
    rows: 3,
    type: "textarea",
    name: "remarks",
    label: "Remarks",
    placeholder: "Enter Remarks",
  },
  {
    name: "workDetails",
    type: "billing",
    widthFull: true,
    label: "Work Details",
    options: [],
  },
  {
    type: "br",
    name: "paymentStages",
    label: "Payment Stages",
    widthFull: true,
  },
  {
    name: "paymentStages",
    type: "group",
    label: "Payment Stages",
    widthFull: true,
    fields: [
      {
        type: "text",
        required: true,
        name: "paymentStages.key",
        label: "Payment Type",
        placeholder: "Enter Payment Type (e.g., 1ST, FINAL)",
      },
      {
        type: "text",
        name: "paymentStages.payment",
        label: "Payment",
        placeholder: "Enter Payment Details",
      },
      {
        type: "text",
        name: "paymentStages.payBy",
        label: "Pay By",
        placeholder: "Enter Pay By",
      },
      {
        type: "date",
        name: "paymentStages.paymentDate",
        label: "Payment Date",
        placeholder: "Select Payment Date",
      },
    ],
  },
];