import { countries } from "@/data/data";
import { FormField } from "@/hooks/types";
import { getSelectFormattedData } from "@/hooks/general";

export const warehouseType: FormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    label: "Warehouse Name",
    placeholder: "Enter warehouse name",
  },
  {
    type: "text",
    name: "line1",
    required: true,
    label: "Address 1",
    placeholder: "Enter Line 1",
  },
  {
    name: "street",
    type: "text",
    label: "Street Address",
    placeholder: "Enter street address",
  },
  {
    name: "city",
    type: "text",
    label: "City",
    required: true,
    placeholder: "Enter city",
  },
  {
    name: "state",
    type: "text",
    required: true,
    label: "State",
    placeholder: "Enter state",
  },
  {
    name: "pinCode",
    maxLength: 15,
    label: "Pin Code",
    required: true,
    type: "stringNumeric",
    placeholder: "Enter pin code",
  },
  {
    type: "select",
    name: "country",
    required: true,
    label: "Country",
    placeholder: "Select Country",
    options: getSelectFormattedData(countries),
  },
  {
    name: "landmark",
    type: "text",
    label: "Landmark",
    placeholder: "Enter landmark",
  },
  // { type: "br", name: "stock", label: "Stock Management", widthFull: true },
  // {
  //   name: "warehouse",
  //   type: "warehouse",
  //   widthFull: true,
  //   label: "Stock Management",
  //   options: [],
  // },
];
