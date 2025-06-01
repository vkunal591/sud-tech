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
  console.log(formData)
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
    doc.addImage(logoBase64, "PNG", 20, 13, 25, 18);
  }

  doc.setFont("helvetica", "semibold").setFontSize(24).text("SUD Group H.K. Co., Ltd.", 60, 27);
  doc.setFont('helvetica', "semibold").setFontSize(10);
  doc.text("Registered Office:Unit 719B, 7/F, Tower B, Southmark, 11 Yip Hing Street, Wong Chuk Hang, Hong Kong.", 20, 35);
  doc.textWithLink("Email: <biz1@sudgroup.cn>", 20, 38, { url: "mailto:biz1@sudgroup.cn" });

  doc.setLineWidth(0.2).line(18, 40, 190, 40);
  doc.setLineWidth(1).line(18, 41, 190, 41);

  doc.setFontSize(10).setFont("helvetica", "semibold").text("VESSEL", 20, 46);
  doc.setFont("helvetica", "400").text(`: ${formData.vesselName} (${formData.vesselImoNo})`, 40, 46);

  doc.setFont("helvetica", "semibold").text("To", 20, 50);
  doc.setFont("helvetica", "400").text(`: ${formData.to}`, 40, 50);

  doc.setFont("helvetica", "semibold").text("C/O", 20, 54);
  doc.setFont("helvetica", "400").text(`: ${formData.co}`, 40, 54);

  doc.setFont("helvetica", "semibold").text("Add", 20, 58);
  // const address =;
  doc.text(':', 40, 58)
  doc.text(doc.splitTextToSize(`${formData.billingTo.billingToStreetAddress}, `, (maxWidth - 20)), 42, 58);

  formData?.paymentNumber === "FINAL" ? doc.setFont("helvetica", "semibol").setFontSize(11).text(`${formData?.paymentNumber || "FINAL"} AGREEMENT & INVOICE (INVOICE NO: SUD(HK)/${formData.invoiceNumber})`, 47, 73) : doc.setFont("helvetica", "semibol").setFontSize(11).text(`${formData?.paymentNumber || "1ST"} PAYMENT REQUEST & INVOICE (INVOICE NO: SUD(HK)/${formData.invoiceNumber})`, 47, 68);
  doc.setLineWidth(0.4).line(47, 70, 175, 70);

  doc.setFont("helvetica", "400").setFontSize(10).text(`INV DATE: ${dayjs(formData.invoiceDate).format("DD MMM YYYY")}`, 150, 80);
  doc.text("DEAR SIR,", 20, 85);
  formData?.paymentNumber === "FINAL" ? doc.text(doc.splitTextToSize(`THE SHIP HAS BEEN REPAIRED IN ${formData?.billingFrom?.billingFromCompanyName?.toUpperCase()}. THROUGH SUD GROUP H.K. CO., LTD. DURING, ${formData?.billingFrom?.billingFromStreetAddress?.toUpperCase()} To ${formData?.billingFrom?.billingFromLandmark?.toUpperCase()}`, maxWidth), 20, 90) : doc.text(doc.splitTextToSize(`CAPTIONED SHIP DRY DOCKING REPAIR IS IN PROGRESS IN ${formData?.billingFrom?.billingFromCompanyName?.toUpperCase()} LTD. THROUGH SUD GROUP H.K. CO., LTD.`, maxWidth), 20, 90);
  formData?.paymentNumber === "FINAL" ? "" : doc.text(doc.splitTextToSize(`VESEL ARRIVED SHIPYARD ON ${formData?.billingFrom?.billingFromStreetAddress?.toUpperCase()} AND ALL REPAIRING WORKS IN PROGRESS UPTO SATISFACTION OF SHIPOWNER’S REPRESENTATIVE, SHIP’S CREW, AND CLASS.`, maxWidth), 20, 99);
  formData?.paymentNumber === "FINAL" ? doc.text(doc.splitTextToSize(`ALL REPAIRING WORKS HAVE BEEN COMPLETED WITH SATISFACTION AND APPROVED BY SHIP OWNER’S REPRESENTATIVE, SHIP’S CREW AND CLASS.`, maxWidth), 20, 102) : doc.text(doc.splitTextToSize(`AS PER INITIAL AGREEMRNT WE REQUEST FOR PART PAYMENT OF ABOVE MENTIONED DRY DOCKING REPAIR.`, maxWidth), 20, 112);
  formData?.paymentNumber === "FINAL" ? doc.text(doc.splitTextToSize(`CONSIDERING QUAITY, REPAIR TIME, WEATHER CONDITIONS, ADDITIONAL WORKS, DEVIATION COMPENSATION, WHOLE PROCESS OF THE REPAIR AND OTHER FACTORS CONCERNED WITH BILLING, BOTH SIDES ACCEPTED AND SETTLED THE BILL AS FOLLOWS.`, maxWidth), 20, 114) : doc.text(doc.splitTextToSize(`FINAL YARD BILL WILL BE ON BASIS OF DISCUSSION AND AGREEMENT BY OWNER’S REPRESENTATIVE ON BASIS OF FINAL WORK DONE LIST.`, maxWidth), 20, 125);
  formData?.paymentNumber === "FINAL" ? doc.text(doc.splitTextToSize(`THE AMOUNT OF THE BILL IN THIS AGREEMENT IS FINALLY SETTLED AFTER SIGNING BY BOTH
PARTIES.`, maxWidth), 20, 128) : "";



  formData?.paymentNumber === "FINAL" ? doc.setFont("helvetica", "semibold", "800").text(`FINAL AGREED AMOUNT: USD ${formData.totalAmount}/-`, 20, 137) : doc.setFont("helvetica", "semibold", "800").text(`PART REMITTANCE AMOUNT IN FIGURE: USD ${formData.totalAmount}/-`, 20, 146);
  formData?.paymentNumber === "FINAL" ? doc.text(doc.splitTextToSize(`(IN WORDS: US DOLLAR ${formData.totalAmountInWords.toUpperCase()})`, maxWidth), 20, 140) : doc.text(doc.splitTextToSize(`PART REMITTANCE AMOUNT IN WORDS: US DOLLAR ${formData.totalAmountInWords.toUpperCase()}`, maxWidth), 20, 151);

  formData?.paymentNumber !== "FINAL" && doc.line(20, 147, 110, 147);
  formData?.paymentNumber !== "FINAL" && doc.line(20, 152, 165, 152);

  formData?.paymentNumber === "FINAL" ? doc.text("PAYMENT TERMS:", 20, 148) : doc.text("PAYMENT TERMS IS AS FOLLOWS.", 20, 160);;
  formData?.paymentNumber !== "FINAL" && doc.line(20, 161, 77, 161);
  const paymentLine = `${formData?.paymentNumber} PAYMENT: USD ${formData?.totalAmount}/- REQUEST TO PAY BEFORE SHIP DEPARTURE.`;
  formData?.paymentNumber !== "FINAL" && doc.text(doc.splitTextToSize(paymentLine.toUpperCase(), maxWidth), 20, 165);


  const paymentStages = [
    { key: "1ST", label: "1. USD", value: formData?.billingFrom?.billingFromCity, y: 153 },
    { key: "2ND", label: "2. USD", value: formData?.billingFrom?.billingFromCountry, y: 158 },
    { key: "3RD", label: "3. USD", value: formData?.billingFrom?.billingFromPincode, y: 163 },
    { key: "4TH", label: "4. USD", value: formData?.billingFrom?.billingFromEmail, y: 168 },
    { key: "5TH", label: "5. USD", value: formData?.billingFrom?.billingFromPhoneNumber, y: 173 },
    { key: "6TH", label: "6. USD", value: formData?.billingTo?.billingToLandmark, y: 178 },
    { key: "7TH", label: "7. USD", value: formData?.billingTo?.billingToCity, y: 183 },
    { key: "8TH", label: "8. USD", value: formData?.billingTo?.billingToCountry, y: 188 },
    { key: "9TH", label: "9. USD", value: formData?.billingTo?.billingToPincode, y: 193 },
    { key: "10TH", label: "10. USD", value: formData?.billingTo?.billingToEmail, y: 198 },
    { key: "FINAL", label: "FINAL USD", value: formData?.bankDetails?.accountName, y: 203 },
  ];

  const selectedIndex = paymentStages.findIndex(stage => stage.key === formData?.paymentNumber);

  // Render all lines up to selected stage
  {
    formData?.paymentNumber === "FINAL" && paymentStages.forEach((stage, index) => {
      console.log(stage)
      if (index <= selectedIndex && stage.value) {
        doc.text(`${stage.value}`, 20, stage.y);
      }
    });
  }




  formData?.paymentNumber !== "FINAL" && doc.text("SUD GROUP BANK ACCOUNT.", 20, 175);
  formData?.paymentNumber !== "Final" ? doc.text("PLEASE MAKE REMITTANCE TO OUR BELOW ACCOUNT.", 20, 180) : doc.text("PLEASE MAKE REMITTANCE TO OUR BELOW ACCOUNT.", 20, 180);

doc.setFontSize(13)
  if (formData?.paymentNumber !== "FINAL") {
    doc.line(20, 182, 190, 182);
    doc.line(20, 182, 20, 210);
    doc.text("Account Name : SUD Group Hong Kong Company Limited.", 22, 187);
    doc.text("Account number : 582-634960-838", 22, 192);
    doc.text("Beneficiary Bank name : HSBC (Hong Kong)", 22, 197);
    doc.text(
      doc.splitTextToSize("Beneficiary Bank Address: 1 Queen's Road Central, Hong Kong", maxWidth),
      22,
      202
    );
    doc.text("Swift Address : HSBCHKHHHKH", 22, 207);
    doc.line(20, 210, 190, 210);
    doc.line(190, 182, 190, 210);
  } else {
    doc.line(20, 212, 190, 212);
    doc.line(20, 212, 20, 240);
    doc.text("Account Name : SUD Group Hong Kong Company Limited.", 22, 217);
    doc.text("Account number : 582-634960-838", 22, 223);
    doc.text("Beneficiary Bank name : HSBC (Hong Kong)", 22, 228);
    doc.text(
      doc.splitTextToSize("Beneficiary Bank Address: 1 Queen's Road Central, Hong Kong", maxWidth),
      22,
      233
    );
    doc.text("Swift Address : HSBCHKHHHKH", 22, 238);
    doc.line(20, 240, 190, 240);
    doc.line(190, 212, 190, 240);
  }

  doc.setFontSize(9);
  formData?.paymentNumber === "FINAL" ? null : doc.textWithLink(`(Remark : When you finish remittance please send copy of bank slip to us by e-mail <biz1@sudgroup.cn>)`, 20, 215, { url: "mailto:biz1@sudgroup.cn" });

  if (formData?.paymentNumber === "FINAL") {
    if (signBase64) {
      doc.addImage(signBase64, "PNG", 20, 250, 50, 25);
    }
  } else {
    if (signBase64) {
      doc.addImage(signBase64, "PNG", 20, 225, 50, 25);
    }
  }

  formData?.paymentNumber === "FINAL" ? doc.text("For and on behalf of", 20, 275) : doc.text("For and on behalf of", 20, 250);
  formData?.paymentNumber === "FINAL" && doc.text("For and on behalf of Owner", 120, 270);

  formData?.paymentNumber === "FINAL" ? doc.setFont("helvetica", 'semibold').setFontSize(11).text("SUD GROUP HONG KONG CO., LTD.", 20, 280) : doc.setFont("helvetica", 'semibold').setFontSize(11).text("SUD GROUP HONG KONG CO., LTD.", 20, 255);
  formData?.paymentNumber === "FINAL" && doc.setFont("helvetica", 'semibold').setFontSize(11).text(`${formData?.billingTo?.billingToCompanyName}`, 120, 275);
  formData?.paymentNumber === "FINAL" && doc.setFont("helvetica", 'semibold').setFontSize(11).text(`${formData.vesselName} (${formData.vesselImoNo})`, 120, 280);


  window.open(doc.output("bloburl"), "_blank");
};
