import { FormField } from "@/hooks/types";

export const paymentFormType: FormField[] = [
  {
    name: "ledgerId",
    type: "select",
    label: "Customer / Supplier",
    placeholder: "Select Customer / Supplier",
    options: [], // This will hold the options for the Select component
  },
  {
    type: "select",
    name: "employee",
    label: "Employee",
    placeholder: "Select employee",
    options: [], // This will hold the options for the Select component
  },
  {
    name: "amount",
    maxLength: 10,
    type: "number",
    required: true,
    label: "Amount",
    placeholder: "Enter amount",
  },
  {
    name: "deduction",
    maxLength: 10,
    type: "number",
    label: "Deduction",
    placeholder: "Enter deduction",
  },
  {
    name: "tdsAmount",
    maxLength: 10,
    type: "number",
    label: "TDS Amount",
    placeholder: "Enter TDS Amount",
  },
  {
    name: "netAmount",
    maxLength: 10,
    type: "number",
    label: "Net Amount",
    placeholder: "Enter net Amount",
  },
  {
    name: "paymentType",
    type: "select",
    required: true,
    label: "Payment Type",
    placeholder: "Select type",
    options: [
      { label: "Ledger Payment", value: "Ledger Payment" },
      { label: "Employee Expense", value: "Employee Expense" },
    ],
  },
  {
    name: "paymentMethod",
    type: "select",
    required: true,
    label: "Payment Method",
    placeholder: "Select method",
    options: [
      { label: "Cash", value: "Cash" },
      { label: "Debit Card", value: "Debit Card" },
      { label: "Credit Card", value: "Credit Card" },
      { label: "Bank Transfer", value: "Bank Transfer" },
      { label: "Online Payment", value: "Online Payment" },
    ],
  },
  {
    name: "paymentDirection",
    type: "select",
    required: true,
    label: "Payment Direction",
    placeholder: "Select direction",
    options: [
      { label: "Paid", value: "Paid" },
      { label: "Received", value: "Received" },
    ],
  },
  {
    name: "paymentStatus",
    type: "select",
    required: true,
    label: "Payment status",
    placeholder: "Select status",
    options: [
      { label: "Failed", value: "Failed" },
      { label: "Pending", value: "Pending" },
      { label: "Completed", value: "Completed" },
    ],
  },
  {
    rows: 1,
    type: "textarea",
    name: "remarks",
    required: true,
    label: "Remarks",
    placeholder: "Enter remarks",
  },
];
