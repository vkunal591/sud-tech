import { formatDate } from "@/hooks/general";
import { FormField } from "@/hooks/types";

export const InvoiceFormType: FormField[] = [
  { type: "br", name: "invoiceDetails", label: "Invoice Details", widthFull: true },
  { type: "text", required: true, name: "_id", label: "ID", placeholder: "Enter ID", isDisabled: true },
  { type: "text", required: true, name: "invoiceNumber", label: "Invoice Number", placeholder: "Enter invoice number", isDisabled: true },
  { type: "date", required: true, name: "invoiceDate", label: "Invoice Date", placeholder: "Select invoice date", isDisabled: true },
  { type: "text", required: true, name: "vesselName", label: "Vessel Name", placeholder: "Enter vessel name", isDisabled: true },
  { type: "text", required: true, name: "vesselImoNo", label: "Vessel IMO No", placeholder: "Enter vessel IMO number", isDisabled: true },
  { type: "date", required: true, name: "createdAt", label: "Created At", placeholder: "Select date and time", isDisabled: true },
  { type: "text", required: true, name: "to", label: "To", placeholder: "Enter recipient", isDisabled: true },
  { type: "text", required: true, name: "co", label: "CO", placeholder: "Enter CO", isDisabled: true },
  { type: "text", required: false, name: "currency", label: "Currency", placeholder: "Enter currency", isDisabled: true },
  { type: "date", required: true, name: "dueDate", label: "Due Date", placeholder: "Select due date", isDisabled: true },
  { type: "text", required: true, name: "paymentDetailsPaymentStatus", label: "Payment Status", placeholder: "Enter payment status", isDisabled: true },
  { type: "number", required: true, name: "totalAmount", label: "Total Amount", placeholder: "Enter total amount", isDisabled: true },
  { type: "text", required: true, name: "totalAmountInWords", label: "Total Amount in Words", placeholder: "Enter amount in words", isDisabled: true },
  { type: "text", required: true, name: "status", label: "Status", placeholder: "Enter status", isDisabled: true },
  { type: "text", required: true, name: "paymentTerms", label: "Payment Terms", placeholder: "Enter payment terms", isDisabled: true },
  { type: "textarea", required: false, name: "remarks", label: "Remarks", placeholder: "Enter remarks", widthFull: true, isDisabled: true },
  { type: "textarea", required: false, name: "mailMessage", label: "Mail Message", placeholder: "Enter mail message", widthFull: true, isDisabled: true },

  { type: "br", name: "bankDetails", label: "Bank Details", widthFull: true },
  { type: "text", required: true, name: "bankDetailsAccountHolderName", label: "Account Holder Name", placeholder: "Enter account holder name", isDisabled: true },
  { type: "text", required: true, name: "bankDetailsAccountName", label: "Account Name", placeholder: "Enter account name", isDisabled: true },
  { type: "text", required: true, name: "bankDetailsAccountNumber", label: "Account Number", placeholder: "Enter account number", isDisabled: true },
  { type: "text", required: true, name: "bankDetailsBankAddress", label: "Bank Address", placeholder: "Enter bank address", isDisabled: true },
  { type: "text", required: true, name: "bankDetailsSwiftAddress", label: "Swift Address", placeholder: "Enter swift address", isDisabled: true },

  { type: "br", name: "billingFrom", label: "Billing From Details", widthFull: true },
  { type: "text", required: true, name: "billingFromBillingFromCity", label: "Billing From City", placeholder: "Enter city", isDisabled: true },
  { type: "text", required: true, name: "billingFromBillingFromCompanyName", label: "Billing From Company Name", placeholder: "Enter company name", isDisabled: true },
  { type: "text", required: true, name: "billingFromBillingFromCountry", label: "Billing From Country", placeholder: "Enter country", isDisabled: true },
  { type: "email", required: true, name: "billingFromBillingFromEmail", label: "Billing From Email", placeholder: "Enter email", isDisabled: true },
  { type: "text", required: true, name: "billingFromBillingFromLandmark", label: "Billing From Landmark", placeholder: "Enter landmark", isDisabled: true },
  { type: "text", required: true, name: "billingFromBillingFromPhoneNumber", label: "Billing From Phone", placeholder: "Enter phone number", isDisabled: true },
  { type: "text", required: true, name: "billingFromBillingFromPincode", label: "Billing From Pincode", placeholder: "Enter pincode", isDisabled: true },
  { type: "text", required: true, name: "billingFromBillingFromStreetAddress", label: "Billing From Address", placeholder: "Enter street address", isDisabled: true },

  { type: "br", name: "billingTo", label: "Billing To Details", widthFull: true },
  { type: "text", required: true, name: "billingToBillingToCity", label: "Billing To City", placeholder: "Enter city", isDisabled: true },
  { type: "text", required: true, name: "billingToBillingToCompanyName", label: "Billing To Company Name", placeholder: "Enter company name", isDisabled: true },
  { type: "text", required: true, name: "billingToBillingToCountry", label: "Billing To Country", placeholder: "Enter country", isDisabled: true },
  { type: "email", required: true, name: "billingToBillingToEmail", label: "Billing To Email", placeholder: "Enter email", isDisabled: true },
  { type: "text", required: true, name: "billingToBillingToLandmark", label: "Billing To Landmark", placeholder: "Enter landmark", isDisabled: true },
  { type: "text", required: true, name: "billingToBillingToPhoneNumber", label: "Billing To Phone", placeholder: "Enter phone number", isDisabled: true },
  { type: "text", required: true, name: "billingToBillingToPincode", label: "Billing To Pincode", placeholder: "Enter pincode", isDisabled: true },
  { type: "text", required: true, name: "billingToBillingToStreetAddress", label: "Billing To Address", placeholder: "Enter street address", isDisabled: true },


];
