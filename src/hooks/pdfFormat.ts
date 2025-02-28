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
  doc.text(`: ${formData?.vesselName + " " + formData?.vesselImoNo || "MT MADEIRO (IMO9418913)"}`, 40, 46)

  doc.setFont(`helvetica`, `bold`); // Set font to Helvetica Bold
  doc.setFontSize(10);
  doc.text(`To`, 20, 50);
  doc.setFont(`helvetica`, `thin`);
  doc.text(`: ${formData?.to || "MASTER & OWNERS OF MT MADEIRO"}`, 40, 50)

  doc.setFont(`helvetica`, `bold`); // Set font to Helvetica Bold
  doc.setFontSize(10);
  doc.text(`C/O`, 20, 54);
  doc.setFont(`helvetica`, `thin`);
  doc.text(`:${formData?.co || " EMPIRE CHEMICAL TANKER HOLDINGS INC."}`, 40, 54)

  doc.setFont(`helvetica`, `bold`); // Set font to Helvetica Bold
  doc.setFontSize(10);
  doc.text(`Add`, 20, 58);
  doc.setFont(`helvetica`, `thin`);
  doc.text(`: ${formData?.billingTo?.billingToCompanyName + ", " + formData?.billingTo?.billingToLandmark + ", " + formData?.billingTo?.billingToStreetAddress +
    ", " + formData?.billingTo?.billingToCity + ", " + formData?.billingTo?.billingToCountry || "ANTONIOU AMPATIELOU 1018536, PIRAEUS, GREECE"}`, 40, 58)


  doc.setFont(`helvetica`, `bold`); // Set font to Helvetica Bold
  doc.setFontSize(10);
  doc.text(`${formData?.paymentNumber || "1ST"} PAYMENT REQUEST & INVOICE (INVOICE NO: SUD(HK)/09A/03-24)`, 45, 68)

  doc.setLineWidth(0.4);
  doc.line(45, 70, 165, 70);

  doc.setFont(`helvetica`, `semibold`); // Set font to Helvetica Bold
  doc.setFontSize(10);
  doc.text(`INV DATE: ${dayjs(formData?.invoiceDate).format("DD-MM-YYYY") || "12TH MARCH,24"}`, 150, 75);

  doc.text(`DEAR SIR, `, 20, 85);
  doc.text(`${formData?.mailMessage || "CAPTIONED SHIP DRY DOCKING REPAIR IS IN PROGRESS IN PAX OCEAN ENGINEERING ZHOUSHAN CO."}`, 20, 90);
  doc.text(`LTD.THROUGH SUD GROUP H.K.CO., LTD.`, 20, 95);
  doc.text(`VESEL ARRIVED SHIPYARD ON 9TH FEB, 2024 AND ALL REPAIRING WORKS IN PROGRESS UPTO`, 20, 105);
  doc.text(`SATISFACTION OF SHIPOWNER’S REPRESENTATIVE, SHIP’S CREW, AND CLASS.`, 20, 110);
  doc.text(`AS PER INITIAL AGREEMRNT WE REQUEST FOR PART PAYMENT OF ABOVE MENTIONED DRY DOCKING`, 20, 115);
  doc.text(`REPAIR.`, 20, 120);
  doc.text(`FINAL YARD BILL WILL BE ON BASIS OF DISCUSSION AND AGREEMENT BY OWNER’S REPRESENTATIVE`, 20, 130);
  doc.text(`ON BASIS OF FINAL WORK DONE LIST.`, 20, 135);

  doc.setFont(`helvetica`, `bold`); // Set font to Helvetica Bold
  doc.text(`PART REMITTANCE AMOUNT IN FIGURE: USD ${formData?.totalAmount || "230,000"}/ -`, 20, 145);
  doc.text(`PART REMITTANCE AMOUNT IN WORDS: ${formData?.totalAmountInWords || "US DOLLAR TWO HUNDRED THIRTY THOUSAND ONLY."}`, 20, 150);
  doc.setLineWidth(0.2);
  doc.line(20, 146, 190, 146);
  doc.setLineWidth(0.2);
  doc.line(20, 151, 190, 151);

  doc.setFont(`helvetica`, `semibold`); // Set font to Helvetica Bold
  doc.text(`PAYMENT TERMS IS AS FOLLOWS.`, 20, 160);
  doc.setLineWidth(0.2);
  doc.line(20, 161, 80, 161);
  doc.text(`FIRST PAYMENT: USD ${formData?.totalAmount + " " + `(${formData?.totalAmountInWords})` + "230,000(USD TWO HUNDRED THIRTY THOUSAND ONLY)"}+" PAY BEFORE SHIP DEPARTURE".`, 20, 165);
  doc.text(`SUD GROUP BANK ACCOUNT.`, 20, 175);
  doc.text(`PLEASE MAKE REMITTANCE TO OUR BELOW ACCOUNT.`, 20, 180);


  doc.setLineWidth(0.2);
  doc.line(20, 182, 190, 182);
  doc.line(20, 182, 20, 210);
  doc.setFont(`helvetica`, `bold`); // Set font to Helvetica Bold
  doc.text(`Account Name : ${formData?.bankDetails.accountName || "SUD Group Hong Kong Company Limited."}`, 22, 187)
  doc.text(`Account number : ${formData?.bankDetails?.accountNumber || "582 - 634960 - 838"}`, 22, 192)
  doc.text(`Beneficiary Bank name : ${formData?.accountHolderName?.accountHolderName || "HSBC(Hong Kong)"}`, 22, 197)
  doc.text(`Beneficiary Bank Address : ${formData?.bankDetails?.bankAddress || "1 Queen's Road Central, Hong Kong"}`, 22, 202)
  doc.text(`Swift Address : ${formData?.bankDetails?.swiftAddress || "HSBCHKHHHKH"}`, 22, 207)
  doc.setLineWidth(0.2);
  doc.line(20, 210, 190, 210);
  doc.line(190, 182, 190, 210);

  doc.setFontSize(9)
  doc.text(`(Remark : ${formData?.remarks || "When you finish remittance please send copy of bank slip to us by e-mail <biz1@sudgroup.cn>)"}`, 20, 215);

  doc.text(`For and on behalf of`, 20, 245)
  doc.setFont(`helvetica`, `bold`); // Set font to Helvetica Bold
  doc.setFontSize(11)
  doc.text(`SUD GROUP HONG KONG CO., LTD.`, 20, 250)




  // // Invoice Data
  // let y = 40; // Starting Y position
  // const lineHeight = 10;

  // const invoiceData = [
  //   { label: `Vessel:`, value: `MT MADEIRO (IMO9418913)` },
  //   { label: `To:`, value: `MASTER & OWNERS OF MT MADEIRO` },
  //   { label: `Company:`, value: `EMPIRE CHEMICAL TANKER HOLDINGS INC.` },
  //   { label: `Address:`, value: `ANTONIOU AMPATIELOU 1018536, PIRAEUS, GREECE` },
  //   { label: `Invoice No:`, value: `SUD(HK)/09A/03-24` },
  //   { label: `Invoice Date:`, value: `12th March, 2024` },
  //   { label: `Shipyard:`, value: `Pax Ocean Engineering Zhoushan Co., Ltd.` },
  //   { label: `Ship Arrival Date:`, value: `9th Feb, 2024` },
  //   { label: `Total Amount:`, value: `USD 230,000` },
  //   { label: `Payment Terms:`, value: `USD 230,000 before ship departure` },
  // ];

  // invoiceData.forEach((item) => {
  //   doc.setFont(`helvetica`, `bold`);
  //   doc.text(item.label, 20, y);
  //   doc.setFont(`helvetica`, `normal`);
  //   doc.text(item.value, 80, y);
  //   y += lineHeight;
  // });

  // Draw Horizontal Line before Bank Details
  // doc.line(10, y + 5, 200, y + 5);
  // y += 15;

  // // Bank Details
  // doc.setFont(`helvetica`, `bold`);
  // doc.text(`Bank Details:`, 20, y);
  // doc.setFont(`helvetica`, `normal`);
  // y += lineHeight;

  // const bankDetails = [
  //   { label: `Account Name:`, value: `SUD Group Hong Kong Company Limited` },
  //   { label: `Account Number:`, value: `582-634960-838` },
  //   { label: `Bank Name:`, value: `HSBC (Hong Kong)` },
  //   { label: `Bank Address:`, value: `1 Queen's Road Central, Hong Kong` },
  //   { label: `SWIFT Code:`, value: `HSBCHKHHHKH` },
  // ];

  // bankDetails.forEach((item) => {
  //   doc.setFont(`helvetica`, `bold`);
  //   doc.text(item.label, 20, y);
  //   doc.setFont(`helvetica`, `normal`);
  //   doc.text(item.value, 80, y);
  //   y += lineHeight;
  // });

  // Draw Final Horizontal Line
  // doc.line(10, y + 5, 200, y + 5);

  // Save the generated PDF
  // doc.save(`invoice-form.pdf`);
  window.open(doc.output(`bloburl`), `_blank`);

};