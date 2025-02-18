// types.ts
export interface Deal {
  id: string;
  client: string;
  dealValue: string;
  dealStatus: string;
  closingDate: string;
  salesperson: string;
}

export interface CRMStats {
  totalRevenue: string;
  activeUsers: string;
  totalDeals: string;
  conversionRatio: string;
  revenueData: {
    month: string;
    thisYear: number;
    lastYear: number;
  }[];
  profitReport: {
    profit: string;
    revenue: string;
    expenses: string;
  };
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface FormField {
  customClasses?: any;
  name: string;
  label: string;
  type:
    | "text"
    | "label"
    | "br"
    | "button"
    | "warehouse"
    | "packing"
    | "billing"
    | "purchaseForm"
    | "stockTransferForm"
    | "email"
    | "password"
    | "richTextEditor"
    | "file"
    | "date"
    | "multipleFiles"
    | "select"
    | "checkbox"
    | "radio"
    | "number"
    | "textarea"
    | "choose"
    | "stringNumeric"
    | "stringNumeric"
    | "productForm";
  value?: any;
  rows?: number;
  min?: number;
  max?: number;
  minDate?: any;
  maxDate?: any;
  options?: any;
  accept?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  maxLength?: number;
  multiple?: boolean;
  isVideo?: boolean;
  required?: boolean;
  widthFull?: boolean;
  isMultiple?: boolean;
  placeholder?: string;
  confirmPlaceholder?: string;
  validation?: (value: any) => string | null;
  isDisabled?: boolean;
}
