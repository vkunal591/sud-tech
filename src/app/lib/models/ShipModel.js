import mongoose from "mongoose";


const Schema = new mongoose.Schema({
    vesselImoNo: { type: String, required: false },
    companyName: { type: String, required: false },
    yardName: { type: String, required: false },
    repairedMonth: { type: String, required: false },
    sudInvoiceToOwners: { type: Number, required: false },
    invoiceNumber: { type: String, required: false },
    dueDate: { type: Date, required: false },
    actualPayment: { type: Number, required: false },
    bankCharges: { type: Number, required: false },
    actualPaymentDate: { type: Date, required: false },
    yardInvoiceToSUD: { type: Number, required: false },
    yardPaymentDueDate: { type: Date, required: false },
    yardActualPaymentDate: { type: Date, required: false },
    vendorInvoiceToSUD: { type: Number, required: false },
    vendorActualPaymentDate: { type: Date, required: false },
    remarks: { type: String },
    
    // Contact Information
    contactPerson: { type: String, required: false },
    email: { type: String, required: false, match: /\S+@\S+\.\S+/ },
    mobileNo: { type: String, required: false },
    
    // Location
    country: { type: String, required: false },
    state: { type: String, required: false },

    // GST & PAN Details
    gstNo: { type: String, required: false },
    panNo: { type: String, required: false },

    // Credit Details
    creditDays: { type: Number, required: false, maxLength: 3 },
    creditLimit: { type: Number, required: false, maxLength: 10 },

    // Address Details
    address: {
        line1: { type: String, required: false },
        street: { type: String },
        city: { type: String, required: false },
        state: { type: String, required: false },
        pinCode: { type: String, required: false, maxLength: 15 },
        country: { type: String, required: false },
        landmark: { type: String }
    },

    // Bank Details
    bank: {
        accountNo: { type: String, required: false },
        bankName: { type: String, required: false },
        branchAddress: { type: String, required: false },
        ifscCode: { type: String, required: false }
    }
}, { timestamps: false });

const ShipModel = mongoose.models.ship || mongoose.model("Ship", Schema);
export default ShipModel;