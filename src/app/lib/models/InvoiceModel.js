import mongoose from "mongoose";

const lineItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },      // Item name / description
  qty: { type: Number, required: true },
  unit: { type: String, required: true },          // e.g., pcs, hrs, kg
  price: { type: Number, required: true },
  amount: { type: Number, required: true },        // qty * price
});

const shipInvoiceSchema = new mongoose.Schema(
  {
    // Vessel & Service Info
    serviceDate: { type: Date },                   // SERVICE DATE
    vesselName: { type: String },                  // VESSEL NAME
    vesselImoNo: { type: String },                 // IMO#
    jobDescription: { type: String },              // JOB DESCRIPTION
    port: { type: String },                        // PORT

    // Invoice Metadata
    mt: { type: String },                          // M.T.
    subject: { type: String },                     // SUBJECT
    invoiceDate: { type: Date },                   // INV-DATE
    invoiceNumber: { type: String },               // INVOICE NO
    orderNumber: { type: String },                 // ORDER NO

    // Invoice Recipient Info
    invoiceTo: { type: String },                   // INVOICE TO
    careOf: { type: String },                      // C/o
    address: { type: String },                     // Address

    // Line Items
    items: [lineItemSchema],                       // Array of item details

    // Totals
    totalAmount: { type: Number },                 // Total invoice amount (USD)

    // Payment Info (Owners to SUD)
    paymentDueDate: { type: Date },
    actualPaymentAmount: { type: Number },
    actualPaymentDate: { type: Date },

    // Additional
    remarks: { type: String },
    companyName: { type: String },
    status: {
      type: "string",
      enum: ["Paid", "Unpaid", "Overdue"],
      default: 'Unpaid'
    }
  },
  { timestamps: true }
);

const ShipInvoice = mongoose.models.ShipInvoice || mongoose.model("ShipInvoice", shipInvoiceSchema);
export default ShipInvoice;
