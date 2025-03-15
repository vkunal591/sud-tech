import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    // Company Details
    companyName: { type: String,  },
    companyType: { type: String,  enum: ['Private', 'Public', 'Government', 'Others'] },
    registrationNo: { type: String,  },
    registrationDate: { type: Date,  },
    vatNo: { type: String },
    gstNo: { type: String },
    panNo: { type: String },
    contactPerson: { type: String,  },
    email: { type: String,  match: /\S+@\S+\.\S+/ },
    phone: { type: String,  },
    website: { type: String },
    
    // Address Details
    address: {
        line1: { type: String,  },
        line2: { type: String },
        city: { type: String,  },
        state: { type: String,  },
        pinCode: { type: String,  maxLength: 15 },
        country: { type: String,  },
        landmark: { type: String },
    },

    // Company Financial Information
    revenue: { type: Number,  },
    netIncome: { type: Number,  },
    annualTurnover: { type: Number,  },
    
    // Bank Details
    bank: {
        accountNo: { type: String, required: false },
        bankName: { type: String,  },
        branchAddress: { type: String, required: false },
        ifscCode: { type: String, required: false }
    },
    
    // Additional Details
    industry: { type: String,  },
    sector: { type: String,  },
    establishedYear: { type: Number,  },
    numberOfEmployees: { type: Number,  },

    // Miscellaneous
    logoUrl: { type: String }, // Link to company logo
    remarks: { type: String },

}, { timestamps: true });

const CompanyModel = mongoose.models.Company || mongoose.model("Company", Schema);
export default CompanyModel;
