import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import Image from "next/image";

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

  const loadLogo = async () => {
    const imgPath = `/assets/logo/logo.png`; // Ensure correct path
    const response = await fetch(imgPath);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === `string`) {
          resolve(reader.result);
        } else {
          reject(`Error converting image to base64`);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };


  const logoBase64 = await loadLogo();

  // Add Logo (if available)
  if (logoBase64) {
    doc.addImage(logoBase64, `PNG`, 20, 15, 30, 15); // Adjust position & size
  }

  // Add Title
  doc.setFont(`helvetica`, `bold`);
  doc.setFontSize(22);
  doc.text(`SUD Group H.K. Co., Ltd.`, 60, 25);
  doc.setFontSize(8);

  doc.text(`Registered Office: Unit 7, 23/F, Enterprise Square Three, 39, Wang Chiu Road, Kowloon Bay, Kowloon, Hong Kong.`, 20, 35);
  doc.text(`Email: <biz1@sudgroup.cn>`, 20, 38);



  // Draw Horizontal Line
  doc.setLineWidth(0.2);
  doc.line(18, 40, 190, 40);
  doc.setLineWidth(1);
  doc.line(18, 41, 190, 41);

  doc.setFont(`helvetica`, `bold`); // Set font to Helvetica Bold
  doc.setFontSize(10);
  doc.text(`VESSEL`, 20, 46);
  doc.setFont(`helvetica`, `thin`);
  doc.text(`: ${formData?.vesselName + " " + formData?.vesselImoNo || ""}`, 40, 46)

  doc.setFont(`helvetica`, `bold`); // Set font to Helvetica Bold
  doc.setFontSize(10);
  doc.text(`To`, 20, 50);
  doc.setFont(`helvetica`, `thin`);
  doc.text(`: ${formData?.to || ""}`, 40, 50)

  doc.setFont(`helvetica`, `bold`); // Set font to Helvetica Bold
  doc.setFontSize(10);
  doc.text(`C/O`, 20, 54);
  doc.setFont(`helvetica`, `thin`);
  doc.text(`: ${formData?.co || ""}`, 40, 54)

  doc.setFont(`helvetica`, `bold`); // Set font to Helvetica Bold
  doc.setFontSize(10);
  doc.text(`Add`, 20, 58);
  doc.setFont(`helvetica`, `thin`);
  // doc.text(`: ${formData?.billingTo?.billingToCompanyName + ", " + formData?.billingTo?.billingToLandmark + ", " + formData?.billingTo?.billingToStreetAddress +
  //   ", " + formData?.billingTo?.billingToCity + ", " + formData?.billingTo?.billingToCountry || "ANTONIOU AMPATIELOU 1018536, PIRAEUS, GREECE"}`, 40, 58)
  const address = `: ${formData?.billingTo?.billingToCompanyName + ", " + formData?.billingTo?.billingToLandmark + ", " + formData?.billingTo?.billingToStreetAddress +  ", " + formData?.billingTo?.billingToCity + ", " + formData?.billingTo?.billingToCountry || "ANTONIOU AMPATIELOU 1018536, PIRAEUS, GREECE"}`;

  const maxWidth = 170; // Set max width for wrapping
  const addressText = doc.splitTextToSize(address, maxWidth);

  doc.text(addressText, 40, 58);

  doc.setFont(`helvetica`, `bold`); // Set font to Helvetica Bold
  doc.setFontSize(10);
  doc.text(`${formData?.paymentNumber || "1ST"} PAYMENT REQUEST & INVOICE (INVOICE NO: SUD(HK)/09A/03-24)`, 45, 68)

  doc.setLineWidth(0.4);
  doc.line(45, 70, 165, 70);

  doc.setFont(`helvetica`, `semibold`); // Set font to Helvetica Bold
  doc.setFontSize(10);
  doc.text(`INV DATE: ${dayjs(formData?.invoiceDate).format("DD-MM-YYYY") || "12TH MARCH,24"}`, 150, 75);

  doc.text(`DEAR SIR, `, 20, 85);
  const message = `${formData?.mailMessage}`.toUpperCase();
  const messageText = doc.splitTextToSize(message, maxWidth);

  doc.text(messageText, 20, 90);
  doc.setFont(`helvetica`, `bold`); // Set font to Helvetica Bold
  doc.text(`PART REMITTANCE AMOUNT IN FIGURE: USD ${formData?.totalAmount || "230,000"}/ -`, 20, 145);
  const payment = `${formData?.totalAmountInWords}`.toUpperCase();
  const paymentText = doc.splitTextToSize(payment, maxWidth);
  doc.text(paymentText, 20, 150);



  // doc.text(`PART REMITTANCE AMOUNT IN WORDS: ${formData?.totalAmountInWords || "US DOLLAR TWO HUNDRED THIRTY THOUSAND ONLY."}`, 20, 150);
  doc.setLineWidth(0.2);
  doc.line(20, 146, 190, 146);
  doc.setLineWidth(0.2);
  doc.line(20, 151, 190, 151);

  doc.setFont(`helvetica`, `semibold`); // Set font to Helvetica Bold
  doc.text(`PAYMENT TERMS IS AS FOLLOWS.`, 20, 160);
  doc.setLineWidth(0.2);
  doc.line(20, 161, 80, 161);
  const paymentInWord = `FIRST PAYMENT: USD ${formData?.totalAmount + " " + formData?.totalAmountInWords}`.toUpperCase();


  const paymentInWordText = doc.splitTextToSize(paymentInWord, maxWidth);

  doc.text(paymentInWordText, 20, 165);

  doc.text(`SUD GROUP BANK ACCOUNT.`, 20, 175);
  doc.text(`PLEASE MAKE REMITTANCE TO OUR BELOW ACCOUNT.`, 20, 180);


  doc.setLineWidth(0.2);
  doc.line(20, 182, 190, 182);
  doc.line(20, 182, 20, 210);
  doc.setFont(`helvetica`, `bold`); // Set font to Helvetica Bold
  doc.text(`Account Name : ${formData?.bankDetails.accountName || ""}`, 22, 187)
  doc.text(`Account number : ${formData?.bankDetails?.accountNumber || ""}`, 22, 192)
  doc.text(`Beneficiary Bank name : ${formData?.accountHolderName?.accountHolderName || ""}`, 22, 197)
  const bankAddress = doc.splitTextToSize(`${formData?.bankDetails?.bankAddress || ""}`, maxWidth);

  doc.text(bankAddress, 22, 202);
  doc.text(`Swift Address : ${formData?.bankDetails?.swiftAddress || ""}`, 22, 207)
  doc.setLineWidth(0.2);
  doc.line(20, 210, 190, 210);
  doc.line(190, 182, 190, 210);

  doc.setFontSize(9)
  const remarksText = doc.splitTextToSize(`(Remark : ${formData?.remarks || ""})`, maxWidth);

  
  doc.text(remarksText, 20, 215);

  doc.text(`For and on behalf of`, 20, 245)
  doc.setFont(`helvetica`, `bold`); // Set font to Helvetica Bold
  doc.setFontSize(11)
  doc.text(`SUD GROUP HONG KONG CO., LTD.`, 20, 250)


  window.open(doc.output(`bloburl`), `_blank`);

};