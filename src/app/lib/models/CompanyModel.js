import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    // Company Details
    companyName: { type: String, required: true },
    companyType: { type: String, required: true, enum: ['Private', 'Public', 'Government', 'Others'] },
    registrationNo: { type: String, required: true },
    registrationDate: { type: Date, required: true },
    vatNo: { type: String },
    gstNo: { type: String },
    panNo: { type: String },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true, match: /\S+@\S+\.\S+/ },
    phone: { type: String, required: true },
    website: { type: String },
    
    // Address Details
    address: {
        line1: { type: String, required: true },
        line2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pinCode: { type: String, required: true, maxLength: 15 },
        country: { type: String, required: true },
        landmark: { type: String },
    },

    // Company Financial Information
    revenue: { type: Number, required: true },
    netIncome: { type: Number, required: true },
    annualTurnover: { type: Number, required: true },
    
    // Bank Details
    bank: {
        accountNo: { type: String, required: false },
        bankName: { type: String, required: true },
        branchAddress: { type: String, required: false },
        ifscCode: { type: String, required: false }
    },
    
    // Additional Details
    industry: { type: String, required: true },
    sector: { type: String, required: true },
    establishedYear: { type: Number, required: true },
    numberOfEmployees: { type: Number, required: true },

    // Miscellaneous
    logoUrl: { type: String }, // Link to company logo
    remarks: { type: String },

}, { timestamps: true });

const CompanyModel = mongoose.models.Company || mongoose.model("Company", Schema);
export default CompanyModel;
