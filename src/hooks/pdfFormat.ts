import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);


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
  const logoBase64 = await loadImageAsBase64("/assets/logo/logo2.png");
  const signBase64 = await loadImageAsBase64("/assets/otp/sign.png");
  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", 14, 15, 37, 17);
  }

  // doc.setFontSize(24).text("联合船务香港有限公司", 60, 20);
  doc.setFontSize(20).text("SUD Group H.K. Co., Ltd.", 65, 25);
  doc.setFontSize(8);
  doc.text("Mob: 0086 1380 8968 263                                  E-mail: tech@sudgroup.cn", 60, 30);
  doc.text("Production Add.: Room 1319, LAN TIAN International Trade Center, No.252, Beijing Road, Rizhao, Shandong, China.", 30, 37);
  doc.text("Registered Office:Unit 719B, 7/F, Tower B, Southmark, 11 Yip Hing Street, Wong Chuk Hang, Hong Kong.", 35, 45);

  doc.setLineWidth(0.8).line(5, 48, 205, 48);

  doc.setFontSize(16).text("Technical Department", 75, 55);
  doc.setFontSize(17).text("INVOICE", 85, 62);

  doc.setFontSize(8)
  doc.text(`Invoice To: MASTER/OWNER OF VESSEL SANGGAU`, 10, 70);
  doc.text(`C/o. Synergy Marine Pte Ltd (As Agents),`, 10, 75);
  doc.text(`1 Kim Seng Promenade,`, 10, 80);
  doc.text(`Great World City West Tower`, 10, 85);
  doc.text(`#10-11/12, 237994, Singapore`, 10, 90);
  doc.text(`M.T.: SANGGAU                                                            Date: May. 14, 2024`, 10, 95);
  doc.text(`Port: LAIZHOU,CHINA                                                   Order No.: SANG24S0043`, 10, 100);
  doc.text(`Subject: Cargo Valves Seat Rings                                  Invoice No.: SUDTECHSAGA-1260`, 10, 105);





  // Item Description
  doc.setLineWidth(0.4).line(5, 110, 205, 110);
  // doc.setLineWidth(0.4).line(5, 100, 205, 100);
  doc.setLineWidth(0.4).line(15, 110, 15, 130);
  doc.setLineWidth(0.4).line(115, 110, 115, 130);
  doc.setLineWidth(0.4).line(135, 110, 135, 130);
  doc.setLineWidth(0.4).line(155, 110, 155, 130);
  doc.setLineWidth(0.4).line(180, 110, 180, 130);

  doc.setFontSize(11).text(doc.splitTextToSize(`NO.`, (maxWidth - 160)), 7, 115);
  doc.setFontSize(11).text(doc.splitTextToSize(`DESCRIPTION.`, (maxWidth - 120)), 50, 115);
  doc.setFontSize(11).text(doc.splitTextToSize(`QTY`, (maxWidth - 155)), 157, 115);
  doc.setFontSize(11).text(doc.splitTextToSize(`UNIT`, (maxWidth - 160)), 120, 115);
  doc.setFontSize(11).text(doc.splitTextToSize(`PRICE`, (maxWidth - 158)), 138, 115);
  doc.setFontSize(11).text(doc.splitTextToSize(`AMOUNT`, (maxWidth - 157)), 185, 115);


  let totalAmount = 0;
  const formatAmountWithCommas = (amount: number): string => {
    return amount.toLocaleString('en-IN') + '/-';
  };


  const drawTable = (doc: any, items: any) => {
    const startX = 5;
    const endX = 205;
    const startY = 120;
    const rowHeight = 10;
    const columnX = [15, 115, 135, 155, 180];

    const totalRows = Number(items.length);

    // Top border
    doc.setLineWidth(0.4).line(startX, startY, endX, startY);

    // Vertical lines
    columnX.forEach((x) => {
      doc.setLineWidth(0.4).line(x, startY, x, startY + (totalRows) * rowHeight);
    });

    // Horizontal lines
    for (let i = 1; i <= totalRows; i++) {
      const y = startY + i * rowHeight;
      doc.setLineWidth(0.4).line(startX, y, endX, y);
    }

    // Table values
    // let totalAmount = 0;

    for (let i = 0; i < totalRows; i++) {
      const y = startY + i * rowHeight + 7;
      const item = items[i];
      const price = parseFloat(item.price) || 0;
      const qty = parseFloat(item.qty) || 0;
      const amount = price * qty;
      totalAmount += amount;

      doc.setFontSize(9);
      doc.text(`${i + 1}`, 7, y);
      doc.text(item.itemName || '', 17, y);
      doc.text(item.qty.toString(), 157, y);
      doc.text(item.unit || '', 117, y);
      doc.text(item.price.toString(), 137, y);
      doc.text(amount.toLocaleString('en-IN'), 182, y);
    }

    // Total row
    const totalY = startY + totalRows * rowHeight + 7;
    doc.setFontSize(9);
    doc.text("TOTAL", 117, totalY);
    doc.text(formatAmountWithCommas(totalAmount), 182, totalY);
  };


  const items = [
    { itemName: 'Gold Necklace', unit: 'pcs', price: '1200', qty: '2' },
    { itemName: 'Earrings', unit: 'pair', price: '500', qty: '1' },
    { itemName: 'Bracelet', unit: 'pcs', price: '700', qty: '3' },
  ];
  console.log(formData)
  drawTable(doc, formData?.items);




  // doc.setLineWidth(0.4).line(5, 217, 205, 217);
  // doc.setLineWidth(0.4).line(5, 218, 205, 218);
  // doc.setLineWidth(0.4).line(170, 218, 170, 227);
  // // Total Invoice amount (USD)
  // doc.setFontSize(18).text(doc.splitTextToSize(`Total Invoice amount (USD)`, (maxWidth - 70)), 7, 225);
  // doc.setFontSize(14).text(doc.splitTextToSize(`${formatAmountWithCommas(totalAmount)}`, (maxWidth - 150)), 174, 225);



  // doc.setLineWidth(0.4).line(5, 227, 205, 227);
  // doc.setLineWidth(0.4).line(5, 228, 205, 228);
  // doc.setLineWidth(0.4).line(60, 228, 60, 232);

  // // Total Invoice amount in words:
  // doc.setFontSize(10.5).text(doc.splitTextToSize(`Total Invoice amount in words:`, (maxWidth - 70)), 7, 231.3);
  // doc.setFontSize(10.5).text(doc.splitTextToSize(`${formData?.totalAmountInWords}`, (maxWidth - 100)), 70, 231.3);


  // doc.setLineWidth(0.4).line(5, 233, 205, 233);
  // doc.setLineWidth(0.4).line(130, 233, 130, 239);
  // SUD Group Hong Kong Company Limited Bank Details
  // doc.setFontSize(7).text(doc.splitTextToSize(`SUD Group Hong Kong Company Limited Bank Details`, (maxWidth - 50)), 7, 238);
  doc.setFontSize(8).text(doc.splitTextToSize(`Authorised signatory with Company Chop`, (maxWidth - 50)), 134, 238);


  doc.setFontSize(8).text(doc.splitTextToSize(`Account Name: SUD Group Hong Kong Company Limited.`, (maxWidth - 50)), 7, 249);
  doc.setFontSize(8).text(doc.splitTextToSize(`Account number: 582-634960-838`, (maxWidth - 50)), 7, 254);
  doc.setFontSize(8).text(doc.splitTextToSize(`Beneficiary Bank name: HSBC (Hong Kong)`, (maxWidth - 50)), 7, 259);
  doc.setFontSize(8).text(doc.splitTextToSize(`Beneficiary Bank Address: 1 Queen's Road Central, Hong Kong`, (maxWidth - 50)), 7, 264);
  doc.setFontSize(8).text(doc.splitTextToSize(`Swift Address: HSBCHKHHHKH`, (maxWidth - 50)), 7, 269);

  if (signBase64) {
    doc.addImage(signBase64, "PNG", 137, 245, 55, 30);
  }












  window.open(doc.output("bloburl"), "_blank");
};
