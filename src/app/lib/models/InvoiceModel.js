import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    invoiceNumber: { type: String, required: true, unique: true },
    invoiceDate: { type: Date, required: true },
    vesselName: { type: String, required: true },
    vesselImoNo: { type: String, required: true },
    co: { type: String, required: true },
    to: { type: String, required: true },
    dueDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    totalAmountInWords: { type: String },
    status: {
        type: String,
        required: true,
        enum: ['Paid', 'Unpaid', 'Pending', 'Overdue'],
        default: 'Unpaid'
    },
    paymentNumber: { type: String },
    paymentTerms: { type: String, required: true },
    remarks: { type: String },
    mailMessage: { type: String },
    currency: { type: String },

    // Company Reference
    // company: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Company",
    // },

    // Billing Details
    billingTo: {
        billingToCompanyName: { type: String, required: true },
        billingToStreetAddress: { type: String },
        billingToLandmark: { type: String },
        billingToCity: { type: String, required: true },
        billingToCountry: { type: String, required: true },
        billingToPincode: { type: String },
        billingToEmail: { type: String },
        billingToPhoneNumber: { type: String },
    },

    billingFrom: {
        billingFromCompanyName: { type: String, required: true },
        billingFromStreetAddress: { type: String },
        billingFromLandmark: { type: String },
        billingFromCity: { type: String, required: true },
        billingFromCountry: { type: String, required: true },
        billingFromPincode: { type: String },
        billingFromEmail: { type: String },
        billingFromPhoneNumber: { type: String },
    },

    // Bank Details
    bankDetails: {
        accountName: { type: String },
        accountNumber: { type: String },
        accountHolderName: { type: String },
        swiftAddress: { type: String },
        bankAddress: { type: String },
    },

    // Payment Details
    paymentDetails: {
        paymentNumber: { type: String }, // e.g., "1st", "2nd", "3rd"
        paymentDate: { type: Date },
        paymentMethod: {
            type: String,
            enum: ['Cash', 'Bank Transfer', 'Credit Card', 'Debit Card', 'Cheque', 'Online'],

        },
        transactionId: { type: String },
        amountPaid: { type: Number, },
        paymentStatus: {
            type: String,
            enum: ['Completed', 'Pending', 'Failed'],
            default: 'Pending'
        },
    },

}, { timestamps: true });

const InvoiceModel = mongoose.models.Invoice || mongoose.model("Invoice", Schema);
export default InvoiceModel;
