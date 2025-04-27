import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    invoiceNumber: { type: String,  unique: true },
    invoiceDate: { type: Date,  },
    vesselName: { type: String,  },
    vesselImoNo: { type: String,  },
    co: { type: String,  },
    to: { type: String,  },
    dueDate: { type: Date,  },
    yardPaymentDueDate: { type: Date,  },
    totalAmount: { type: Number,  },
    totalAmountInWords: { type: String },
    status: {
        type: String,
        
        enum: ['Paid', 'Unpaid', 'Pending', 'Overdue'],
        default: 'Unpaid'
    },
    paymentNumber: { type: String },
    paymentTerms: { type: String,  },
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
        billingToCompanyName: { type: String,  },
        billingToStreetAddress: { type: String },
        billingToLandmark: { type: String },
        billingToCity: { type: String,  },
        billingToCountry: { type: String,  },
        billingToPincode: { type: String },
        billingToEmail: { type: String },
        billingToPhoneNumber: { type: String },
    },

    billingFrom: {
        billingFromCompanyName: { type: String,  },
        billingFromStreetAddress: { type: String },
        billingFromLandmark: { type: String },
        billingFromCity: { type: String,  },
        billingFromCountry: { type: String,  },
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
