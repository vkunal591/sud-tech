import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  line1: { type: String },
  street: { type: String },
  city: { type: String },
  state: { type: String},
  pinCode: { type: String},
  country: { type: String},
  landmark: { type: String }
});

const shipDetailsSchema = new mongoose.Schema(
  {
    vesselName: { type: String, required: true },
    vesselImoNo: { type: String, required: true },
    companyName: { type: String, required: true },
    gstNo: { type: String },
    panNo: { type: String },
    creditDays: { type: String },
    creditLimit: { type: String },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: String, required: true },
    countryOfOperation: { type: String },
    province: { type: String },
    invoiceNumber: { type: String, required: true },
    yardName: { type: String, required: true },
    repairedMonth: { type: String, required: true },
    sudInvoiceToOwners: { type: String, required: true },
    actualPaymentDate: { type: String, required: true },
    actualPayment: { type: String, required: true },
    bankCharges: { type: String, required: true },
    dueDate: { type: String, required: true },
    yardInvoiceToSUD: { type: String, required: true },
    yardActualPaymentDate: { type: String, required: true },
    yardPaymentDueDate: { type: String, required: true },
    vendorInvoiceToSUD: { type: String, required: true },
    vendorActualPaymentDate: { type: String, required: true },
    vendorPaymentDueDate: { type: String, required: true },
    // address: addressSchema,
    line1: { type: String},
    street: { type: String },
    city: { type: String },
    state: { type: String },
    pinCode: { type: String },
    country: { type: String},
    landmark: { type: String },
    accountNo: { type: String },
    bankName: { type: String},
    branchAddress: { type: String },
    ifscCode: { type: String },
    remarks: { type: String }
  },
  { timestamps: true }
);

const Ship = mongoose.models.Ship || mongoose.model("Ship", shipDetailsSchema);
export default Ship;
