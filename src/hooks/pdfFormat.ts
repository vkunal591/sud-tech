import dayjs from "dayjs";
import { jsPDF } from "jspdf";

// Removed `Image` import from "next/image" since it's unused.

interface BillingDetails {
  billingToCompanyName: string;
  billingToStreetAddress: string;
  billingToLandmark: string;
  billingToCity: string;
  billingToCountry: string;
  billingToPincode: string;
  billingToEmail: string;
  billingToPhoneNumber: string;
}

interface BillingFrom {
  billingFromCompanyName: string;
  billingFromStreetAddress: string;
  billingFromLandmark: string;
  billingFromCity: string;
  billingFromCountry: string;
  billingFromPincode: string;
  billingFromEmail: string;
  billingFromPhoneNumber: string;
}

interface BankDetails {
  accountName: string;
  accountNumber: string;
  accountHolderName: string;
  swiftAddress: string;
  bankAddress: string;
}

interface PaymentDetails {
  paymentStatus: string;
}

interface Invoice {
  billingTo: BillingDetails;
  billingFrom: BillingFrom;
  bankDetails: BankDetails;
  paymentDetails: PaymentDetails;
  _id: string;
  invoiceNumber: string;
  invoiceDate: string;
  vesselName: string;
  vesselImoNo: string;
  co: string;
  to: string;
  dueDate: string;
  totalAmount: number;
  totalAmountInWords: string;
  status: string;
  paymentTerms: string;
  remarks: string;
  mailMessage: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const handleDownloadPDF = async (formData: any) => {
  const doc = new jsPDF();
  const maxWidth = 170;

  const loadImageAsBase64 = async (path: string): Promise<string> => {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        typeof reader.result === "string"
          ? resolve(reader.result)
          : reject("Error converting image to base64");
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const logoBase64 = await loadImageAsBase64("/assets/logo/logo.png");
  const signBase64 = await loadImageAsBase64("/assets/otp/sign.png");

  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", 20, 15, 30, 15);
  }

  doc.setFont("helvetica", "bold").setFontSize(22).text("SUD Group H.K. Co., Ltd.", 60, 25);
  doc.setFontSize(8);
  doc.text("Registered Office: Unit 7, 23/F, Enterprise Square Three, 39, Wang Chiu Road, Kowloon Bay, Kowloon, Hong Kong.", 20, 35);
  doc.text("Email: <biz1@sudgroup.cn>", 20, 38);

  doc.setLineWidth(0.2).line(18, 40, 190, 40);
  doc.setLineWidth(1).line(18, 41, 190, 41);

  doc.setFontSize(10).setFont("helvetica", "bold").text("VESSEL", 20, 46);
  doc.setFont("helvetica", "normal").text(`: ${formData.vesselName} ${formData.vesselImoNo}`, 40, 46);

  doc.setFont("helvetica", "bold").text("To", 20, 50);
  doc.setFont("helvetica", "normal").text(`: ${formData.to}`, 40, 50);

  doc.setFont("helvetica", "bold").text("C/O", 20, 54);
  doc.setFont("helvetica", "normal").text(`: ${formData.co}`, 40, 54);

  doc.setFont("helvetica", "bold").text("Add", 20, 58);
  const address = `: ${formData.billingTo.billingToCompanyName}, ${formData.billingTo.billingToLandmark}, ${formData.billingTo.billingToStreetAddress}, ${formData.billingTo.billingToCity}, ${formData.billingTo.billingToCountry}`;
  doc.text(doc.splitTextToSize(address, maxWidth), 40, 58);

  doc.setFont("helvetica", "bold").text(`${formData.paymentDetails.paymentStatus || "1ST"} PAYMENT REQUEST & INVOICE (INVOICE NO: ${formData.invoiceNumber})`, 45, 68);
  doc.setLineWidth(0.4).line(45, 70, 165, 70);

  doc.setFont("helvetica", "normal").text(`INV DATE: ${dayjs(formData.invoiceDate).format("DD-MM-YYYY")}`, 150, 75);
  doc.text("DEAR SIR,", 20, 85);
  doc.text(doc.splitTextToSize(formData.mailMessage.toUpperCase(), maxWidth), 20, 90);

  doc.setFont("helvetica", "bold").text(`PART REMITTANCE AMOUNT IN FIGURE: USD ${formData.totalAmount}/ -`, 20, 145);
  doc.text(doc.splitTextToSize(formData.totalAmountInWords.toUpperCase(), maxWidth), 20, 150);
  doc.line(20, 146, 190, 146);
  doc.line(20, 151, 190, 151);

  doc.text("PAYMENT TERMS IS AS FOLLOWS.", 20, 160);
  doc.line(20, 161, 80, 161);
  const paymentLine = `${formData.paymentDetails.paymentStatus} PAYMENT: USD ${formData.totalAmount} ${formData.totalAmountInWords}`;
  doc.text(doc.splitTextToSize(paymentLine.toUpperCase(), maxWidth), 20, 165);

  doc.text("SUD GROUP BANK ACCOUNT.", 20, 175);
  doc.text("PLEASE MAKE REMITTANCE TO OUR BELOW ACCOUNT.", 20, 180);

  doc.line(20, 182, 190, 182);
  doc.line(20, 182, 20, 210);
  doc.text(`Account Name : ${formData.bankDetails.accountName}`, 22, 187);
  doc.text(`Account number : ${formData.bankDetails.accountNumber}`, 22, 192);
  doc.text(`Beneficiary Bank name : ${formData.bankDetails.accountHolderName}`, 22, 197);
  doc.text(doc.splitTextToSize(`Bank Address: ${formData.bankDetails.bankAddress}`, maxWidth), 22, 202);
  doc.text(`Swift Address : ${formData.bankDetails.swiftAddress}`, 22, 207);
  doc.line(20, 210, 190, 210);
  doc.line(190, 182, 190, 210);

  doc.setFontSize(9);
  doc.text(doc.splitTextToSize(`(Remark : ${formData.remarks})`, maxWidth), 20, 215);

  if (signBase64) {
    doc.addImage(signBase64, "PNG", 20, 230, 50, 25);
  }

  doc.text("For and on behalf of", 20, 260);
  doc.setFont("helvetica", "bold").setFontSize(11).text("SUD GROUP HONG KONG CO., LTD.", 20, 265);

  window.open(doc.output("bloburl"), "_blank");
};
