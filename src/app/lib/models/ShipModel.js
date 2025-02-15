import mongoose from "mongoose";


const Schema = new mongoose.Schema({
    vesselImoNo: { type: String, required: true },
    companyName: { type: String, required: true },
    yardName: { type: String, required: true },
    repairedMonth: { type: String, required: true },
    sudInvoiceToOwners: { type: Number, required: true },
    invoiceNumber: { type: String, required: true },
    dueDate: { type: Date, required: true },
    actualPayment: { type: Number, required: true },
    bankCharges: { type: Number, required: true },
    actualPaymentDate: { type: Date, required: true },
    yardInvoiceToSUD: { type: Number, required: true },
    yardPaymentDueDate: { type: Date, required: true },
    yardActualPaymentDate: { type: Date, required: true },
    vendorInvoiceToSUD: { type: Number, required: true },
    vendorActualPaymentDate: { type: Date, required: true },
    remarks: { type: String },
    
    // Contact Information
    contactPerson: { type: String, required: true },
    email: { type: String, required: true, match: /\S+@\S+\.\S+/ },
    mobileNo: { type: String, required: true },
    
    // Location
    country: { type: String, required: true },
    state: { type: String, required: true },

    // GST & PAN Details
    gstNo: { type: String, required: false },
    panNo: { type: String, required: false },

    // Credit Details
    creditDays: { type: Number, required: false, maxLength: 3 },
    creditLimit: { type: Number, required: false, maxLength: 10 },

    // Address Details
    address: {
        line1: { type: String, required: true },
        street: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pinCode: { type: String, required: true, maxLength: 15 },
        country: { type: String, required: true },
        landmark: { type: String }
    },

    // Bank Details
    bank: {
        accountNo: { type: String, required: false },
        bankName: { type: String, required: true },
        branchAddress: { type: String, required: false },
        ifscCode: { type: String, required: false }
    }
}, { timestamps: true });

const ShipModel = mongoose.models.ship || mongoose.model("Ship", Schema);
export default ShipModel;