import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    // Invoice Details
    invoiceNumber: { type: String, required: true, unique: true },
    invoiceDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    status: { 
        type: String, 
        required: true, 
        enum: ['Paid', 'Unpaid', 'Pending', 'Overdue'], 
        default: 'Unpaid'
    },
    paymentTerms: { type: String, required: true },
    notes: { type: String },
    
    // Company Reference
    company: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Company", 
        required: true 
    },

    // Billing Details
    billingAddress: {
        line1: { type: String, required: true },
        line2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pinCode: { type: String, required: true, maxLength: 15 },
        country: { type: String, required: true },
        landmark: { type: String },
    },

    // Payment Details
    paymentDetails: {
        paymentDate: { type: Date },
        paymentMethod: { 
            type: String, 
            enum: ['Cash', 'Bank Transfer', 'Credit Card', 'Debit Card', 'Cheque', 'Online'], 
            required: true 
        },
        transactionId: { type: String },
        amountPaid: { type: Number, required: true },
        paymentStatus: { 
            type: String, 
            enum: ['Completed', 'Pending', 'Failed'], 
            default: 'Pending' 
        },
    },

}, { timestamps: true });

const InvoiceModel = mongoose.models.Invoice || mongoose.model("Invoice", Schema);
export default InvoiceModel;
