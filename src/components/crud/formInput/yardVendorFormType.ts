import { FormField } from "@/hooks/types";

export const YardVendorFormType: FormField[] = [
  {
    type: "br",
    name: "yardToSud",
    label: "Yard To SUD Payment (Invoice) Details",
    widthFull: true,
  },
  {
    name: "yardInvoiceToSUD",
    type: "text",
    label: "Yard Invoice To SUD",
    placeholder: "Enter yard invoice to SUD",
  },
  {
    name: "yardActualPaymentDate",
    type: "date",
    label: "Yard Actual Payment Date",
    placeholder: "Select yard actual payment date",
  },
  {
    name: "yardPaymentDueDate",
    type: "date",
    label: "Yard Payment Due Date",
    placeholder: "Enter yard payment due date",
  },
  {
    type: "br",
    name: "protsDetails",
    label: "Ports Details",
    widthFull: true,
  },
  {
    name: "portsNo",
    type: "text",
    label: "Ports No",
    placeholder: "Enter ports no",
  },
  {
    name: "portsName",
    type: "text",
    label: "Ports Name",
    placeholder: "Enter ports name",
  },
  {
    name: "portsWorkStartDate",
    type: "date",
    label: "Ports WorK Start Date",
    placeholder: "Ports Work Start Date",
  },
  {
    type: "br",
    name: "vendortosud",
    label: "Vendor To SUD Payment (Invoice) Details",
    widthFull: true,
  },

  {
    name: "vendorDetails",
    type: "group",
    label: "Vendor Details",
    placeholder: "Enter Vendor Details",
    widthFull: true,
    fields: [
      {
        name: "vendorInvoiceToSUD",
        type: "text",

        label: "Vendor Invoice To SUD Amount",
        placeholder: "Enter vendor invoice to SUD",
      },
      {
        name: "vendorActualPaymentDate",
        type: "date",

        label: "Vendor Actual Payment Date",
        placeholder: "Select vendor actual payment date",
      },
      {
        name: "vendorPaymentDueDate",
        type: "date",

        label: "Vendor Payment Due Date",
        placeholder: "Select vendor payment due date",
      },
    ],
  },
];
