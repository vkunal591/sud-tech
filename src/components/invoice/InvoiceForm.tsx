"use client";
// InvoiceForm.tsx
import Image from "next/image";
import BillingSection from "./BillingSection";
import ProductRow from "./ProductRow";
import { IoDocument, IoDownload, IoSend } from "react-icons/io5";
import { useState } from "react";
import jsPDF from "jspdf";

const InvoiceForm = ({ responseData }: { responseData: any }) => {
  console.log(responseData);
  // Initialize form state with the provided response data
  const [formData, setFormData] = useState({
    vesselImoNo: responseData.vesselImoNo || "",
    companyName: responseData.companyName || "",
    yardName: responseData.yardName || "",
    repairedMonth: responseData.repairedMonth || "",
    sudInvoiceToOwners: responseData.sudInvoiceToOwners || "",
    invoiceNumber: responseData.invoiceNumber || "",
    dueDate: responseData.dueDate
      ? new Date(responseData.dueDate).toISOString().slice(0, 10)
      : "",
    actualPayment: responseData.actualPayment || "",
    bankCharges: responseData.bankCharges || "",
    actualPaymentDate: responseData.actualPaymentDate
      ? new Date(responseData.actualPaymentDate).toISOString().slice(0, 10)
      : "",
    yardInvoiceToSUD: responseData.yardInvoiceToSUD || "",
    yardPaymentDueDate: responseData.yardPaymentDueDate
      ? new Date(responseData.yardPaymentDueDate).toISOString().slice(0, 10)
      : "",
    yardActualPaymentDate: responseData.yardActualPaymentDate
      ? new Date(responseData.yardActualPaymentDate).toISOString().slice(0, 10)
      : "",
    vendorInvoiceToSUD: responseData.vendorInvoiceToSUD || "",
    vendorActualPaymentDate: responseData.vendorActualPaymentDate
      ? new Date(responseData.vendorActualPaymentDate)
          .toISOString()
          .slice(0, 10)
      : "",
    remarks: responseData.remarks || "",
    contactPerson: responseData.contactPerson || "",
    email: responseData.email || "",
    mobileNo: responseData.mobileNo || "",
    gstNo: responseData.gstNo || "",
    panNo: responseData.panNo || "",
    creditDays: responseData.creditDays || "",
    creditLimit: responseData.creditLimit || "",
    address: responseData.address || {}
  });

  // Handle input change for controlled components
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name.includes("address")) {
      const addressKey = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressKey]: value
        }
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(12);
    doc.text("Invoice Form", 20, 20);

    // Add the form data to the PDF (you can adjust the placement accordingly)
    doc.text(`Invoice Number: ${formData.invoiceNumber}`, 20, 30);
    doc.text(`Vessel IMO No: ${formData.vesselImoNo}`, 20, 40);
    doc.text(`Company Name: ${formData.companyName}`, 20, 50);
    doc.text(`Due Date: ${formData.dueDate}`, 20, 60);
    doc.text(`Total Amount: ${formData.sudInvoiceToOwners}`, 20, 70);
    doc.text(`Remarks: ${formData.remarks}`, 20, 80);

    // You can add more fields as needed...

    // Save the generated PDF
    doc.save("invoice-form.pdf");
  };

  // Handle form submission
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  const billingNotes =
    "If you&lsquo;re not satisfied with the product, you can return the unused item within 10 days of the delivery date. For refund options, please visit the official website and review the available refund policies.";
  return (
    <div className="lg:flex lg:gap-4 p-2 px-2">
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="lg:flex justify-between items-center gap-4">
            <div className="lg:w-2/3">
              <div className="flex mb-2">
                <label className="inline-block w-1/4 mb-1 text-sm">
                  Invoice No:
                </label>
                <input
                  required
                  autoComplete="off"
                  placeholder="Enter your invoice number"
                  className="w-3/4 text-primary outline text-sm outline-gray-100 px-4 py-1 placeholder:text-gray-400 bg-white rounded"
                  type="text"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="flex mb-2">
                <label className="inline-block w-1/4 mb-1 text-sm">
                  Payment No:
                </label>
                <input
                  required
                  autoComplete="off"
                  placeholder="Enter your invoice number"
                  className="w-3/4 text-primary outline text-sm outline-gray-100 px-4 py-1 placeholder:text-gray-400 bg-white rounded"
                  type="text"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="flex mb-2">
                <label className="inline-block w-1/4 mb-1 text-sm">To:</label>
                <input
                  required
                  autoComplete="off"
                  placeholder="Enter your Invoice Date"
                  className="w-3/4 text-primary outline text-sm outline-gray-100 px-4 py-1 placeholder:text-gray-400 bg-white rounded"
                  type="text"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="lg:w-2/3">
              <div className="flex mb-2">
                <label className="inline-block w-1/4 mb-1 text-sm">
                  Issued Date:
                </label>
                <input
                  required
                  autoComplete="off"
                  placeholder="Enter your Invoice Date"
                  className="w-3/4 text-primary outline text-sm outline-gray-100 px-4 py-1 placeholder:text-gray-400 bg-white rounded"
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
              <div className="flex mb-2">
                <label className="inline-block w-1/4 mb-1 text-sm">
                  Vessel No:
                </label>
                <input
                  required
                  autoComplete="off"
                  placeholder="Enter your Invoice Date"
                  className="w-3/4 text-primary outline text-sm outline-gray-100 px-4 py-1 placeholder:text-gray-400 bg-white rounded"
                  type="text"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
              <div className="flex mb-2">
                <label className="inline-block w-1/4 mb-1 text-sm">C/O:</label>
                <input
                  required
                  autoComplete="off"
                  placeholder="Enter your Invoice Date"
                  className="w-3/4 text-primary outline text-sm outline-gray-100 px-4 py-1 placeholder:text-gray-400 bg-white rounded"
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* <div className="lg:w-1/3 text-right m-2">
          <Image src="/next.svg" alt="logo" width={85} height={75} className="inline" />
        </div> */}
          </div>

          {/* Address Fields */}
          <div>
            <label className="inline-block w-1/4 mb-1 text-sm">Address:</label>
            <input
              type="text"
              name="address.line1"
              value={formData.address.line1}
              onChange={handleChange}
              className="w-full text-primary outline text-sm outline-gray-100 px-4 py-1 placeholder:text-gray-400 bg-white rounded"
            />
          </div>
        </form>
        <BillingSection />

        <div className="bg-primary text-white mt-4 p-4 rounded mb-6">
          <div className="flex justify-between mb-2">
            <label className="inline-block w-2/4 mb-1 text-sm font-bold">
              Due Date :
            </label>
            <input
              required
              autoComplete="off"
              placeholder="Due date"
              className="lg:w-2/4 text-primary outline text-sm outline-gray-100 px-4 py-2 placeholder:text-gray-400 bg-white rounded"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="inline-block lg:w-2/4 mb-1 text-md font-semibold">
              Total Amount ($)
            </label>
            <input
              required
              autoComplete="off"
              placeholder="Total Amount"
              className="lg:w-2/4 text-primary outline text-sm outline-gray-100 px-4 py-2 placeholder:text-gray-400 bg-white rounded"
              type="text"
              name="totalAmount"
              value={formData.actualPayment || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="inline-block lg:w-2/4 mb-1 text-md font-semibold">
              Total Amount In Word
            </label>
            <input
              required
              autoComplete="off"
              placeholder="Total Amount"
              className="lg:w-2/4 text-primary outline text-sm outline-gray-100 px-4 py-2 placeholder:text-gray-400 bg-white rounded"
              type="text"
              name="totalAmount"
              value={formData.actualPayment || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* <ProductRow /> */}
        {/* Mode of Payment */}
        <div className="bg-white rounded-md p-4">
          <h3 className="text-sm font-bold mb-2">Messes:</h3>
          <textarea
            name="note"
            id="note"
            rows={3}
            value={billingNotes}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          ></textarea>
        </div>
        <div className="bg-white rounded-md p-4">
          <h3 className="text-sm font-bold mb-2">Payment Terms:</h3>
          <textarea
            name="note"
            id="note"
            rows={3}
            value={billingNotes}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          ></textarea>
        </div>
        <div className="bg-white rounded-md p-4">
          <h3 className="text-sm font-bold mb-2">Remark:</h3>
          <textarea
            name="note"
            id="note"
            rows={3}
            value={billingNotes}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          ></textarea>
        </div>

        <div className=" mt-4 lg:mt-0 h-fit bg-white shadow rounded-lg py-3">
          <h1 className="text-lg font-semibold text-left px-3 py-2 border-b-2 border-gray-100 text-gray-800">
            Mode Of Payment
          </h1>
          <div className="px-4 py-3">
            <button className="px-3 py-1 m-1 bg-purple-50 text-primary rounded-md text-sm font-bold">
              Bank Details{" "}
            </button>
            {/* <button className="px-3 py-1 m-1 bg-gray-100 text-gray-700 rounded-md text-sm font-bold">
              UPI Payment
            </button> */}
          </div>

          <div className="border mx-3 border-gray-200 rounded-md px-3 py-4">
            <form className="grid grid-cols-2 gap-4">
              <div className="mb-2 text-left items-center">
                <label className="inline-block w-full text-left text-gray-500 font-semibold required mx-2 mb-1 text-xs">
                  Account Name
                </label>
                <input
                  required
                  autoComplete="off"
                  placeholder="Enter account name"
                  className={`w-full text-primary outline text-sm  outline-gray-200 px-4 py-2 placeholder:text-gray-400 bg-white rounded`}
                  type="text"
                />
              </div>
              <div className="mb-2 text-left items-center">
                <label className="inline-block w-full text-left text-gray-500 font-semibold required mx-2 mb-1 text-xs">
                  A/C number
                </label>
                <input
                  required
                  autoComplete="off"
                  placeholder="Enter a/c number"
                  className={`w-full text-primary outline text-sm  outline-gray-200 px-4 py-2 placeholder:text-gray-400 bg-white rounded`}
                  type="number"
                />
              </div>
              <div className="mb-2 text-left items-center">
                <label className="inline-block w-full text-left text-gray-500 font-semibold required mx-2 mb-1 text-xs">
                  A/C Holder Name
                </label>
                <input
                  required
                  autoComplete="off"
                  placeholder="Enter a/c holder name"
                  className={`w-full text-primary outline text-sm  outline-gray-200 px-4 py-2 placeholder:text-gray-400 bg-white rounded`}
                  type="text"
                />
              </div>
              <div className="mb-1 text-left items-center">
                <label className="inline-block w-full text-left text-gray-500 font-semibold required mx-2 mb-1 text-xs">
                  Swift Address:
                </label>
                <input
                  required
                  autoComplete="off"
                  placeholder="Enter swift address"
                  className={`w-full text-primary outline text-sm  outline-gray-200 px-4 py-2 placeholder:text-gray-400 bg-white rounded`}
                  type="text"
                />
              </div>
              <div className="mb-1 col-span-2 text-left items-center">
                <label className="inline-block w-full text-left text-gray-500 font-semibold required mx-2 mb-1 text-xs">
                  Beneficiary Bank Address:
                </label>
                <input
                  required
                  autoComplete="off"
                  placeholder="Enter swift address"
                  className={`w-full text-primary outline text-sm  outline-gray-200 px-4 py-2 placeholder:text-gray-400 bg-white rounded`}
                  type="text"
                />
              </div>
            </form>
{/* 
            <div className="mb-1 text-center items-center">
              <p className="bg-green-100 rounded my-2 text-green-700 text-xs font-semibold py-3 px-4 text-left">
                Please Make sure to pay the invoice bill within 120 days.
              </p>
            </div> */}
          </div>
        </div>

        <div className="lg:flex lg:justify-between">
          <div className="flex space-x-4 mt-4">
            <button
              className="bg-primary flex  text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleDownloadPDF}
            >
              Save As PDF{" "}
              <IoDocument width={15} height={15} className="m-auto ml-2" />
            </button>
            {/* <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              +
            </button>
            <button className="bg-green-600 text-white px-3.5 py-2 rounded-md hover:bg-yellow-600">
              <IoDownload width={15} height={15} />
            </button> */}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            {/* <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Preview
            </button> */}
            <button className="p-2 bg-primary flex text-white rounded">
              Send Invoice{" "}
              <IoSend width={15} height={15} className="m-auto ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
