import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  invoiceNumber: { type: String, unique: true, required: true },
  invoiceType: {
    type: String,
    enum: ["PORTS", "DOCK"],
    required: true,
  },
  status:{
    type:String,
    enum:["Paid","Pending","Unpaid","Overdue"],
    default:"Unpaid"
  },
  invoiceDate: { type: Date },
  vesselName: { type: String },
  vesselImoNo: { type: String },
  co: { type: String },
  to: { type: String },
  dueDate: { type: Date },
  yardPaymentDueDate: { type: Date },
  totalAmount: { type: Number },
  totalAmountInWords: { type: String },
  remarks: { type: String },
  billingTo: {
    companyName: { type: String },
    streetAddress: { type: String },
    landmark: { type: String },
    city: { type: String },
    country: { type: String },
    pincode: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
  },
  billingFrom: {
    companyName: { type: String },
    streetAddress: { type: String },
    landmark: { type: String },
    city: { type: String },
    country: { type: String },
    pincode: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
  },
  bankDetails: {
    accountName: { type: String },
    accountNumber: { type: String },
    accountHolderName: { type: String },
    swiftAddress: { type: String },
    bankAddress: { type: String },
  },
  workDetails: [
    {
      itemDesc: { type: String },
      unit: { type: String },
      unitCost: { type: Number },
      quantity: { type: Number },
      value: { type: Number },
    },
  ],
  paymentStages: [
    {
      key: { type: String, required: true },
      payment: { type: String },
      payBy: { type: String },
      paymentDate: { type: Date },
    },
  ],
}, { timestamps: true });

const InvoiceModel = mongoose.models.Invoice || mongoose.model("Invoice", Schema);
export default InvoiceModel;
