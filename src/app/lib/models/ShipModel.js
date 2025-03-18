// import mongoose from "mongoose";

// const addressSchema = new mongoose.Schema({
//   line1: { type: String },
//   street: { type: String },
//   city: { type: String },
//   state: { type: String },
//   pinCode: { type: String },
//   country: { type: String },
//   landmark: { type: String }
// });

// const shipDetailsSchema = new mongoose.Schema(
//   {
//     vesselName: { type: String,  },
//     vesselImoNo: { type: String,  },
//     companyName: { type: String,  },
//     invoiceNumber: { type: String,  },
//     yardName: { type: String,  },
//     repairedMonth: { type: String,  },
//     sudInvoiceToOwners: { type: String,  },
//     actualPaymentDate: { type: String,  },
//     actualPayment: { type: String,  },
//     bankCharges: { type: String,  },
//     dueDate: { type: String,  },
//     yardInvoiceToSUD: { type: String,  },
//     yardActualPaymentDate: { type: String,  },
//     yardPaymentDueDate: { type: String,  },
//     vendorInvoiceToSUD: { type: String,  },
//     vendorActualPaymentDate: { type: String,  },
//     vendorPaymentDueDate: { type: String,  },
//     // street: { type: String },
//     // landmark: { type: String },
//     // city: { type: String },
//     // state: { type: String },
//     // pinCode: { type: String },
//     // country: { type: String },
//     // accountNo: { type: String },
//     // bankName: { type: String },
//     // branchAddress: { type: String },
//     // ifscCode: { type: String },
//     remarks: { type: String }
//   },
//   { timestamps: true }
// );

// const Ship = mongoose.models.Ship || mongoose.model("Ship", shipDetailsSchema);
// export default Ship;
























import mongoose from "mongoose";



const shipDetailsSchema = new mongoose.Schema(
  {
    vesselName: { type: String },
    vesselImoNo: { type: String },
    companyName: { type: String },
    invoiceNumber: { type: String },
    yardName: { type: String },
    repairedMonth: { type: String },
    sudInvoiceToOwners: { type: String },
    actualPaymentDate: { type: String },
    actualPayment: { type: String },
    bankCharges: { type: String },
    dueDate: { type: String },
    yardInvoiceToSUD: { type: String },
    yardActualPaymentDate: { type: String },
    yardPaymentDueDate: { type: String },
    vendorDetails: [
      {
        vendorInvoiceToSUD: { type: String },
        vendorActualPaymentDate: { type: String },
        vendorPaymentDueDate: { type: String }
      }
    ],
    street: { type: String },
    landmark: { type: String },
    city: { type: String },
    state: { type: String },
    pinCode: { type: String },
    country: { type: String },
    accountNo: { type: String },
    bankName: { type: String },
    branchAddress: { type: String },
    ifscCode: { type: String },
    remarks: { type: String }
  },
  { timestamps: true }
);

const Ship = mongoose.models.Ship || mongoose.model("Ship", shipDetailsSchema);
export default Ship;
