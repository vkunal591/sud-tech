import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);


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

  let data = 0
  // formData?.paymentStages.forEach((d: any) => d?.payment ? data++ : "")
  const logoBase64 = await loadImageAsBase64("/assets/logo/logo.png");
  const signBase64 = await loadImageAsBase64("/assets/otp/sign.png");
    if (logoBase64) {
      doc.addImage(logoBase64, "PNG", 20, 13, 25, 18);
    }

    doc.setFont("helvetica", "semibold").setFontSize(24).text("SUD Group H.K. Co., Ltd.", 60, 27);
    doc.setFont('helvetica', "semibold").setFontSize(10);
    doc.text("Registered Office:Unit 719B, 7/F, Tower B, Southmark, 11 Yip Hing Street, Wong Chuk Hang, Hong Kong.", 20, 35);
    doc.textWithLink("Email: <biz1@sudgroup.cn>", 20, 38, { url: "mailto:biz1@sudgroup.cn" });

//     doc.setLineWidth(0.2).line(18, 40, 190, 40);
//     doc.setLineWidth(1).line(18, 41, 190, 41);

//     doc.setFontSize(10).setFont("helvetica", "semibold").text("VESSEL", 20, 46);
//     doc.setFont("helvetica", "400").text(`: ${formData.vesselName} (${formData.vesselImoNo})`, 40, 46);

//     doc.setFont("helvetica", "semibold").text("To", 20, 50);
//     doc.setFont("helvetica", "400").text(`: ${formData.to}`, 40, 50);

//     doc.setFont("helvetica", "semibold").text("C/O", 20, 54);
//     doc.setFont("helvetica", "400").text(`: ${formData.co}`, 40, 54);

//     doc.setFont("helvetica", "semibold").text("Add", 20, 58);
//     // const address =;
//     doc.text(':', 40, 58)
//     doc.text(doc.splitTextToSize(`${formData.billingTo.streetAddress}, `, (maxWidth - 20)), 42, 58);

//     formData?.paymentNumber === "FINAL" ? doc.setFont("helvetica", "semibol").setFontSize(10).text(`${formData?.paymentNumber || "FINAL"} AGREEMENT & INVOICE (INVOICE NO: ${formData.invoiceNumber})`, 47, 73) : doc.setFont("helvetica", "semibol").setFontSize(10).text(`${formData?.paymentNumber || "1ST"} PAYMENT REQUEST & INVOICE (INVOICE NO: ${formData.invoiceNumber})`, 47, 68);
//     formData?.paymentNumber === "FINAL" ? doc.setLineWidth(0.4).line(47, 75, 165, 75) : doc.setLineWidth(0.4).line(47, 70, 165, 70);

//     doc.setFont("helvetica", "400").setFontSize(10).text(`INV DATE: ${dayjs(formData.invoiceDate).format("DD MMM YYYY")}`, 150, 80);
//     doc.text("DEAR SIR,", 20, 85);
//     formData?.paymentNumber === "FINAL" ? doc.text(doc.splitTextToSize(`THE SHIP HAS BEEN REPAIRED IN ${formData?.billingFrom?.companyName?.toUpperCase()}. THROUGH SUD GROUP H.K. CO., LTD. DURING, ${formData?.billingFrom?.streetAddress?.toUpperCase()} To ${formData?.billingFrom?.landmark?.toUpperCase()}`, maxWidth), 20, 90) : doc.text(doc.splitTextToSize(`CAPTIONED SHIP DRY DOCKING REPAIR IS IN PROGRESS IN ${formData?.billingFrom?.companyName?.toUpperCase()} LTD. THROUGH SUD GROUP H.K. CO., LTD.`, maxWidth), 20, 90);
//     formData?.paymentNumber === "FINAL" ? "" : doc.text(doc.splitTextToSize(`VESEL ARRIVED SHIPYARD ON ${formData?.billingFrom?.streetAddress?.toUpperCase()} AND ALL REPAIRING WORKS IN PROGRESS UPTO SATISFACTION OF SHIPOWNER’S REPRESENTATIVE, SHIP’S CREW, AND CLASS.`, maxWidth), 20, 99);
//     formData?.paymentNumber === "FINAL" ? doc.text(doc.splitTextToSize(`ALL REPAIRING WORKS HAVE BEEN COMPLETED WITH SATISFACTION AND APPROVED BY SHIP OWNER’S REPRESENTATIVE, SHIP’S CREW AND CLASS.`, maxWidth), 20, 102) : doc.text(doc.splitTextToSize(`AS PER INITIAL AGREEMRNT WE REQUEST FOR PART PAYMENT OF ABOVE MENTIONED DRY DOCKING REPAIR.`, maxWidth), 20, 112);
//     formData?.paymentNumber === "FINAL" ? doc.text(doc.splitTextToSize(`CONSIDERING QUAITY, REPAIR TIME, WEATHER CONDITIONS, ADDITIONAL WORKS, DEVIATION COMPENSATION, WHOLE PROCESS OF THE REPAIR AND OTHER FACTORS CONCERNED WITH BILLING, BOTH SIDES ACCEPTED AND SETTLED THE BILL AS FOLLOWS.`, maxWidth), 20, 114) : doc.text(doc.splitTextToSize(`FINAL YARD BILL WILL BE ON BASIS OF DISCUSSION AND AGREEMENT BY OWNER’S REPRESENTATIVE ON BASIS OF FINAL WORK DONE LIST.`, maxWidth), 20, 125);
//     formData?.paymentNumber === "FINAL" ? doc.text(doc.splitTextToSize(`THE AMOUNT OF THE BILL IN THIS AGREEMENT IS FINALLY SETTLED AFTER SIGNING BY BOTH
// PARTIES.`, maxWidth), 20, 128) : "";
//     console.log(data)


//     formData?.paymentNumber === "FINAL" ? doc.setFont("helvetica", "bold").text(`${formData?.paymentNumber} AGREED AMOUNT: USD ${formData.totalAmount}/-`, 20, 137) : doc.setFont("helvetica", "bold").text(`PART REMITTANCE AMOUNT IN FIGURE: USD ${formData.totalAmount}/-`, 20, 146);
//     formData?.paymentNumber === "FINAL" ? doc.text(doc.splitTextToSize(`(IN WORDS: US DOLLAR ${formData.totalAmountInWords.toUpperCase()})`, maxWidth), 20, 141) : doc.text(doc.splitTextToSize(`PART REMITTANCE AMOUNT IN WORDS: US DOLLAR ${formData.totalAmountInWords.toUpperCase()}`, maxWidth), 20, 151);
//     doc.setFont("helvetica", "semibold")
//     formData?.paymentNumber !== "FINAL" && doc.line(20, 147, 110, 147);
//     formData?.paymentNumber !== "FINAL" && doc.line(20, 152, 165, 152);

//     formData?.paymentNumber === "FINAL" ? doc.text("PAYMENT TERMS:", 20, 148) : doc.text("PAYMENT TERMS IS AS FOLLOWS.", 20, 160);;
//     formData?.paymentNumber !== "FINAL" && doc.line(20, 161, 77, 161);
//     const paymentLine = `${formData?.paymentNumber} PAYMENT: USD ${formData?.totalAmount}/- REQUEST TO PAY BEFORE SHIP DEPARTURE.`;
//     formData?.paymentNumber !== "FINAL" && doc.text(doc.splitTextToSize(paymentLine.toUpperCase(), maxWidth), 20, 165);

//     // Helper to format payment amount with commas and "/-"
//     const formatPaymentAmount = (amount: number): string => {
//       return amount.toLocaleString('en-US') + '/-';
//     };

//     // Generate payment stages with dynamic y only for valid data
//     let currentY = 153;
//     const paymentStages = (() => {
//       const stages: any[] = [];

//       for (let i = 0; i < 11; i++) {
//         const stage = formData?.paymentStages?.[i];
//         const label = i === 10 ? `${data}. USD` : `${i + 1}. USD`;
//         const key = i === 10 ? "FINAL" : `${i + 1}TH`;

//         if (stage?.payment) {
//           stages.push({
//             key,
//             label,
//             value: `${formatPaymentAmount(Number(stage.payment))} ${stage.payBy} ${dayjs(stage.paymentDate).format('Do MMMM,YYYY').toUpperCase()}`,
//             y: currentY,
//           });
//           currentY += 5; // Increment y only when data exists
//         }
//       }

//       return stages;
//     })();

//     // Get selected payment stage index
//     const selectedIndex = paymentStages.findIndex(
//       (stage) => stage.key === formData?.paymentNumber
//     );

//     // Render only up to selected payment stage if FINAL
//     if (formData?.paymentNumber === "FINAL" && selectedIndex >= 0) {
//       paymentStages.forEach((stage, index) => {
//         if (index <= selectedIndex && stage.value) {
//           doc.text(`${stage.label} ${stage.value}`, 20, stage.y);
//         }
//       });
//     }


//     formData?.paymentNumber !== "FINAL" && doc.text("SUD GROUP BANK ACCOUNT.", 20, 175);
//     formData?.paymentNumber !== "FINAL" ? doc.text("PLEASE MAKE REMITTANCE TO OUR BELOW ACCOUNT.", 20, 180) : doc.text("PLEASE MAKE REMITTANCE TO OUR BELOW ACCOUNT.", 20, 210);

//     doc.setFontSize(13)
//     if (formData?.paymentNumber !== "FINAL") {
//       doc.line(20, 182, 190, 182);
//       doc.line(20, 182, 20, 210);
//       doc.text("Account Name : SUD Group Hong Kong Company Limited.", 22, 187);
//       doc.text("Account number : 582-634960-838", 22, 192);
//       doc.text("Beneficiary Bank name : HSBC (Hong Kong)", 22, 197);
//       doc.text(
//         doc.splitTextToSize("Beneficiary Bank Address: 1 Queen's Road Central, Hong Kong", maxWidth),
//         22,
//         202
//       );
//       doc.text("Swift Address : HSBCHKHHHKH", 22, 207);
//       doc.line(20, 210, 190, 210);
//       doc.line(190, 182, 190, 210);
//     } else {
//       doc.line(20, 212, 190, 212);
//       doc.line(20, 212, 20, 240);
//       doc.text("Account Name : SUD Group Hong Kong Company Limited.", 22, 217);
//       doc.text("Account number : 582-634960-838", 22, 223);
//       doc.text("Beneficiary Bank name : HSBC (Hong Kong)", 22, 228);
//       doc.text(
//         doc.splitTextToSize("Beneficiary Bank Address: 1 Queen's Road Central, Hong Kong", maxWidth),
//         22,
//         233
//       );
//       doc.text("Swift Address : HSBCHKHHHKH", 22, 238);
//       doc.line(20, 240, 190, 240);
//       doc.line(190, 212, 190, 240);
//     }

//     doc.setFontSize(9);
//     formData?.paymentNumber === "FINAL" ? null : doc.textWithLink(`(Remark : When you finish remittance please send copy of bank slip to us by e-mail <biz1@sudgroup.cn>)`, 20, 215, { url: "mailto:biz1@sudgroup.cn" });

//     if (formData?.paymentNumber === "FINAL") {
//       if (signBase64) {
//         doc.addImage(signBase64, "PNG", 20, 250, 50, 25);
//       }
//     } else {
//       if (signBase64) {
//         doc.addImage(signBase64, "PNG", 20, 225, 50, 25);
//       }
//     }

//     formData?.paymentNumber === "FINAL" ? doc.text("FOR AND ON BEHALF OF", 20, 275) : doc.text("For and on behalf of", 20, 250);
//     formData?.paymentNumber === "FINAL" && doc.text("FOR AND ON BEHALF OF OWNER", 120, 270);

//     formData?.paymentNumber === "FINAL" ? doc.setFont("helvetica", 'semibold').setFontSize(11).text("SUD GROUP HONG KONG CO., LTD.", 20, 280) : doc.setFont("helvetica", 'semibold').setFontSize(11).text("SUD GROUP HONG KONG CO., LTD.", 20, 255);
//     formData?.paymentNumber === "FINAL" && doc.setFont("helvetica", 'semibold').setFontSize(11).text(`${formData?.billingTo?.companyName}`, 120, 275);
//     formData?.paymentNumber === "FINAL" && doc.setFont("helvetica", 'semibold').setFontSize(11).text(`${formData.vesselName} (${formData.vesselImoNo})`, 120, 280);







































//     doc.setLineWidth(0.6).line(5, 15, 205, 15);
//     doc.setLineWidth(0.6).line(5, 15, 5, 280);
//     // SUD GROUP HONG KONG CO., LTD.


//     doc.setFont("helvetica", "semibold").setFontSize(24).text("SUD Group H.K. Co., Ltd.", 60, 27);
//     doc.setFont('helvetica', "semibold").setFontSize(13);
//     doc.text("Unit 719B, 7/F, Tower B, Southmark, 11 Yip Hing Street, Wong Chuk Hang, Hong Kong.", 20, 35);

//     // Unit 719B, 7/F, Tower B, Southmark, 11 Yip Hing Street, Wong Chuk Hang, Hong Kong
//     doc.setLineWidth(0.6).line(5, 40, 205, 40);
//     doc.setLineWidth(0.6).line(5, 42, 205, 42);
//     // INVOICE
//     doc.setFont("helvetica", "semibold").setFontSize(24).text("INVOICE", 90, 50.5);
//     doc.setLineWidth(0.6).line(5, 54, 205, 54);
//     // Invoice No: SUD(HK)/01/01-25 | Bill to Company(Name & address)
//     doc.setFont("helvetica", "semibold").setFontSize(12).text(`Invoice No:${formData?.invoiceNumber}`, 7, 58.5);
//     doc.setFont("helvetica", "semibold").setFontSize(12).text(`Bill to Company(Name & address)`, 117, 58.5);

//     doc.setLineWidth(0.4).line(115, 54, 115, 96);
//     doc.setLineWidth(0.4).line(5, 60, 205, 60);
//     // Invoice date: 07/Jan/2025
//     doc.setFont("helvetica", "semibold").setFontSize(12).text(`Invoice date:${dayjs(formData?.invoiceDate).format("DD/MMM/YYYY")}`, 7, 65);
//     doc.setFontSize(11).text(doc.splitTextToSize(`TO: ${formData?.to}`, (maxWidth - 90)), 117, 65);
//     // Truncate function
//     const truncateText = (text: any, maxLength: any) => {
//       return text && text.length > maxLength ? text.substring(0, maxLength) + '...' : text || '';
//     };

//     // Truncate values
//     const truncatedCo = truncateText(formData?.co, 40);
//     const truncatedStreet = truncateText(formData?.billingTo?.streetAddress, 65);

//     // Add to PDF
//     doc.setFontSize(11).text(doc.splitTextToSize(`C/O: ${truncatedCo}`, (maxWidth - 80)), 117, 78);
//     doc.setFontSize(11).text(doc.splitTextToSize(`Add: ${truncatedStreet}`, (maxWidth - 80)), 117, 83);
//     doc.setFontSize(11).text(doc.splitTextToSize(`Email: ${formData?.businessMail?.toLowerCase()}`, (maxWidth - 90)), 117, 94);


//     doc.setLineWidth(0.4).line(5, 66, 115, 66);
//     doc.setFont("helvetica", "semibold").setFontSize(12).text(`Invoice date:${dayjs(formData?.dueDate).format("DD/MMM/YYYY")}`, 7, 70);
//     // Invoice payment due date: 07/Feb/2025
//     doc.setLineWidth(0.4).line(5, 72, 115, 72);
//     doc.setFontSize(11).text(doc.splitTextToSize(`Remark: PO NUMBER: ${formData?.portsName}`, (maxWidth - 70)), 7, 77);

//     // Remark: PO Number: BCEC-OTS-O2400332
//     // 2Winch Brake Test at Zhenjiang port on 17th Oct,2024.
//     // doc.setLineWidth(0.4).line(5, 78, 115, 78);
//     doc.setLineWidth(0.4).line(5, 96, 205, 96);
//     doc.setLineWidth(0.4).line(5, 97, 205, 97);




//     // Item Description
//     doc.setLineWidth(0.4).line(5, 99, 205, 99);
//     doc.setLineWidth(0.4).line(5, 100, 205, 100);
//     doc.setLineWidth(0.4).line(15, 100, 15, 120);
//     doc.setLineWidth(0.4).line(115, 100, 115, 120);
//     doc.setLineWidth(0.4).line(135, 100, 135, 120);
//     doc.setLineWidth(0.4).line(155, 100, 155, 120);
//     doc.setLineWidth(0.4).line(180, 100, 180, 120);

//     doc.setFontSize(11).text(doc.splitTextToSize(`Item No.`, (maxWidth - 160)), 7, 105);
//     doc.setFontSize(11).text(doc.splitTextToSize(`Item Description.`, (maxWidth - 120)), 50, 105);
//     doc.setFontSize(11).text(doc.splitTextToSize(`Unit`, (maxWidth - 160)), 120, 105);
//     doc.setFontSize(11).text(doc.splitTextToSize(`Unit Cost (USD)`, (maxWidth - 158)), 138, 105);
//     doc.setFontSize(11).text(doc.splitTextToSize(`Quantity`, (maxWidth - 155)), 157, 105);
//     doc.setFontSize(11).text(doc.splitTextToSize(`Total Amount (USD)`, (maxWidth - 157)), 185, 105);


//     let totalAmount = 0;
//     const formatAmountWithCommas = (amount: number): string => {
//       return amount.toLocaleString('en-IN') + '/-';
//     };


//     const drawTable = (doc: any, items: any) => {
//       const startX = 5;
//       const endX = 205;
//       const startY = 120;
//       const rowHeight = 10;
//       const columnX = [15, 115, 135, 155, 180];

//       const totalRows = items.length;

//       // Top border
//       doc.setLineWidth(0.4).line(startX, startY, endX, startY);

//       // Vertical lines
//       columnX.forEach((x) => {
//         doc.setLineWidth(0.4).line(x, startY, x, startY + (totalRows) * rowHeight);
//       });

//       // Horizontal lines
//       for (let i = 1; i <= totalRows; i++) {
//         const y = startY + i * rowHeight;
//         doc.setLineWidth(0.4).line(startX, y, endX, y);
//       }

//       // Table values
//       // let totalAmount = 0;

//       for (let i = 0; i < totalRows; i++) {
//         const y = startY + i * rowHeight + 7;
//         const item = items[i];
//         const unitCost = parseFloat(item.unitCost) || 0;
//         const quantity = parseFloat(item.quantity) || 0;
//         const amount = unitCost * quantity;
//         totalAmount += amount;

//         doc.setFontSize(9);
//         doc.text(`${i + 1}`, 7, y);
//         doc.text(item.itemDesc || '', 17, y);
//         doc.text(item.unit || '', 117, y);
//         doc.text(item.unitCost.toString(), 137, y);
//         doc.text(item.quantity.toString(), 157, y);
//         doc.text(amount.toLocaleString('en-IN'), 182, y);
//       }

//       // Total row
//       // const totalY = startY + totalRows * rowHeight + 7;
//       // doc.setFontSize(9);
//       // doc.text("TOTAL", 117, totalY);
//       // doc.text(formatAmountWithCommas(totalAmount), 182, totalY);
//     };


//     const items = [
//       { itemDesc: 'Gold Necklace', unit: 'pcs', unitCost: '1200', quantity: '2' },
//       { itemDesc: 'Earrings', unit: 'pair', unitCost: '500', quantity: '1' },
//       { itemDesc: 'Bracelet', unit: 'pcs', unitCost: '700', quantity: '3' },
//     ];

//     drawTable(doc, formData?.workDetails);




//     doc.setLineWidth(0.4).line(5, 217, 205, 217);
//     doc.setLineWidth(0.4).line(5, 218, 205, 218);
//     doc.setLineWidth(0.4).line(170, 218, 170, 227);
//     // Total Invoice amount (USD)
//     doc.setFontSize(18).text(doc.splitTextToSize(`Total Invoice amount (USD)`, (maxWidth - 70)), 7, 225);
//     doc.setFontSize(14).text(doc.splitTextToSize(`${formatAmountWithCommas(totalAmount)}`, (maxWidth - 150)), 174, 225);



//     doc.setLineWidth(0.4).line(5, 227, 205, 227);
//     doc.setLineWidth(0.4).line(5, 228, 205, 228);
//     doc.setLineWidth(0.4).line(60, 228, 60, 232);

//     // Total Invoice amount in words:
//     doc.setFontSize(10.5).text(doc.splitTextToSize(`Total Invoice amount in words:`, (maxWidth - 70)), 7, 231.3);
//     doc.setFontSize(10.5).text(doc.splitTextToSize(`${formData?.totalAmountInWords}`, (maxWidth - 100)), 70, 231.3);


//     doc.setLineWidth(0.4).line(5, 232, 205, 232);
//     doc.setLineWidth(0.4).line(5, 233, 205, 233);
//     doc.setLineWidth(0.4).line(130, 233, 130, 239);
//     // SUD Group Hong Kong Company Limited Bank Details
//     doc.setFontSize(14).text(doc.splitTextToSize(`SUD Group Hong Kong Company Limited Bank Details`, (maxWidth - 50)), 7, 238);
//     doc.setFontSize(11).text(doc.splitTextToSize(`Authorised signatory with Company Chop`, (maxWidth - 50)), 134, 238);


//     doc.setFontSize(12).text(doc.splitTextToSize(`Account Name: SUD Group Hong Kong Company Limited.`, (maxWidth - 50)), 7, 249);
//     doc.setFontSize(12).text(doc.splitTextToSize(`Account number: 582-634960-838`, (maxWidth - 50)), 7, 254);
//     doc.setFontSize(12).text(doc.splitTextToSize(`Beneficiary Bank name: HSBC (Hong Kong)`, (maxWidth - 50)), 7, 259);
//     doc.setFontSize(12).text(doc.splitTextToSize(`Beneficiary Bank Address: 1 Queen's Road Central, Hong Kong`, (maxWidth - 50)), 7, 264);
//     doc.setFontSize(12).text(doc.splitTextToSize(`Swift Address: HSBCHKHHHKH`, (maxWidth - 50)), 7, 269);

//     if (signBase64) {
//       doc.addImage(signBase64, "PNG", 137, 245, 55, 30);
//     }

//     doc.setLineWidth(0.4).line(5, 239, 205, 239);
//     doc.setLineWidth(0.4).line(5, 240, 205, 240);
//     doc.setLineWidth(0.4).line(130, 240, 130, 280);


    // END


    doc.setLineWidth(0.6).line(205, 15, 205, 280);
    doc.setLineWidth(0.6).line(5, 280, 205, 280);






  
  window.open(doc.output("bloburl"), "_blank");
};
