"use client";
// InvoiceForm.tsx
import Image from "next/image";
import BillingSection from "./BillingSection";
import ProductRow from "./ProductRow";
import { IoDocument, IoDownload, IoSend } from "react-icons/io5";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { handleDownloadPDF } from "@/hooks/pdfFormat";

const InvoiceForm = ({ responseData }: { responseData: any }) => {
  console.log(responseData);
  // Initialize form state with the provided response data
  // const [formData, setFormData] = useState({
  //   vesselImoNo: responseData.vesselImoNo || "",
  //   companyName: responseData.companyName || "",
  //   yardName: responseData.yardName || "",
  //   repairedMonth: responseData.repairedMonth || "",
  //   sudInvoiceToOwners: responseData.sudInvoiceToOwners || "",
  //   invoiceNumber: responseData.invoiceNumber || "",
  //   dueDate: responseData.dueDate
  //     ? new Date(responseData.dueDate).toISOString().slice(0, 10)
  //     : "",
  //   actualPayment: responseData.actualPayment || "",
  //   bankCharges: responseData.bankCharges || "",
  //   actualPaymentDate: responseData.actualPaymentDate
  //     ? new Date(responseData.actualPaymentDate).toISOString().slice(0, 10)
  //     : "",
  //   yardInvoiceToSUD: responseData.yardInvoiceToSUD || "",
  //   yardPaymentDueDate: responseData.yardPaymentDueDate
  //     ? new Date(responseData.yardPaymentDueDate).toISOString().slice(0, 10)
  //     : "",
  //   yardActualPaymentDate: responseData.yardActualPaymentDate
  //     ? new Date(responseData.yardActualPaymentDate).toISOString().slice(0, 10)
  //     : "",
  //   vendorInvoiceToSUD: responseData.vendorInvoiceToSUD || "",
  //   vendorActualPaymentDate: responseData.vendorActualPaymentDate
  //     ? new Date(responseData.vendorActualPaymentDate)
  //       .toISOString()
  //       .slice(0, 10)
  //     : "",
  //   remarks: responseData.remarks || "",
  //   contactPerson: responseData.contactPerson || "",
  //   email: responseData.email || "",
  //   mobileNo: responseData.mobileNo || "",
  //   gstNo: responseData.gstNo || "",
  //   panNo: responseData.panNo || "",
  //   creditDays: responseData.creditDays || "",
  //   creditLimit: responseData.creditLimit || "",
  //   address: responseData.address || {}
  // });

  const [formData, setFormData] = useState({
    invoiceNumber: responseData?.invoiceNumber || "",
    invoiceDate: "",
    paymentNumber: "",
    to: "",
    issuedDate: "",
    vesselNumber: "",
    co: responseData?.companyName || "",
    address: responseData?.address || "",
    dueDate: responseData?.dueDate || "",
    totalAmount: responseData?.sudInvoiceToOwners || "",
    totalAmountInWords: "",
    mailMessage: "",
    paymentTerms: "",
    remarks: responseData?.remarks || "",
    currency: "",
    billingTo: {
      companyName: responseData?.companyName || "",
      address: responseData?.address || "",
      email: responseData?.email || "",
      phoneNumber: responseData?.phone || "",
    },
    billingFrom: {
      companyName: "",
      address: "",
      email: "",
      phoneNumber: "",
      zipCode: "",
    },
    bankDetails: {
      accountName: "",
      accountNumber: "",
      accountHolderName: "",
      swiftAddress: "",
      bankAddress: "",
    },
  });

  // Set form data when responseData is available
  useEffect(() => {
    if (responseData) {
      setFormData((prevData) => ({
        ...prevData,
        ...responseData,
        address: { ...prevData.address, ...responseData.address },
        billingTo: { ...prevData.billingTo, ...responseData.billingTo },
        billingFrom: { ...prevData.billingFrom, ...responseData.billingFrom },
        bankDetails: { ...prevData.bankDetails, ...responseData.bankDetails },
      }));
    }
  }, [responseData]);

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name.includes("address.") || name.includes("billingTo.") || name.includes("billingFrom.") || name.includes("bankDetails.")) {
      const [section, field] = name.split(".");
      setFormData((prevData: any) => ({
        ...prevData,
        [section]: { ...prevData[section], [field]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form submitted successfully!");
  };



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
                  name="paymentNumber"
                  value={formData.paymentNumber}
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
                  type="date"
                  name="to"
                  value={formData.to}
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
                  name="invoiceDate"
                  value={formData.invoiceDate}
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
                  name="vesserlNumber"
                  value={formData.vesselNumber}
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
                  type="text"
                  name="co"
                  value={formData.co}
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
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full text-primary outline text-sm outline-gray-100 px-4 py-1 placeholder:text-gray-400 bg-white rounded"
            />
          </div>
        </form>


        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <h3 className="font-bold mb-2">Billing To :</h3>
            <input
              type="text"
              placeholder="Company Name"
              name="companyName"
              value={formData?.billingTo?.companyName}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Enter Address"
              name="address"
              value={formData?.billingTo?.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
            <input
              type="email"
              placeholder="Company Email"
              name="email"
              value={formData?.billingTo?.email}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Phone Number"
              name="phoneNumber"
              value={formData?.billingTo?.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <h3 className="font-bold mb-2">Billing From :</h3>
            <input
              type="text"
              placeholder="Company Name"
              name="companyName"
              value={formData?.billingFrom?.companyName}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Enter Address"
              name="address"
              value={formData?.billingFrom?.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData?.billingFrom?.email}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Phone Number"
              name="phoneNumber"
              value={formData?.billingFrom?.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Zip Code"
              name="zipCode"
              value={formData?.billingFrom?.zipCode}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded"
            />
            <label htmlFor="currency" className="block m-2 font-semibold">Currency</label>
            <select className="border border-gray-200 p-2 px-2 rounded text-gray-400 text-sm outline-none w-full"
              value={formData?.currency}
              onChange={handleChange}
              name="currency"
            >
              <option value="">Select Currency</option>
              <option value="$">$</option>
              <option value="₹">₹</option>
            </select>
          </div>
        </div>

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
              value={formData?.totalAmount}
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
              value={formData.totalAmountInWords}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* <ProductRow /> */}
        {/* Mode of Payment */}
        <div className="bg-white rounded-md p-4">
          <h3 className="text-sm font-bold mb-2">Mail Message:</h3>
          <textarea
            name="mailMessage"
            id="mailMessage"
            rows={3}
            value={formData?.mailMessage}
            onChange={handleChange}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          ></textarea>
        </div>
        <div className="bg-white rounded-md p-4">
          <h3 className="text-sm font-bold mb-2">Payment Terms:</h3>
          <textarea
            name="paymentTerms"
            id="paymetnTerms"
            rows={3}
            value={formData?.paymentTerms}
            onChange={handleChange}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          ></textarea>
        </div>
        <div className="bg-white rounded-md p-4">
          <h3 className="text-sm font-bold mb-2">Remark:</h3>
          <textarea
            name="remarks"
            id="note"
            rows={3}
            value={formData?.remarks}
            onChange={handleChange}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          ></textarea>
        </div>

        <div className=" mt-4 lg:mt-0 h-fit bg-white shadow rounded-lg py-3">
          <h1 className="text-lg font-semibold text-left px-3 py-2 border-b-2 border-gray-100 text-gray-800">
            Mode Of Payment
          </h1>
          {/* <div className="px-4 py-3">
            <button className="px-3 py-1 m-1 bg-purple-50 text-primary rounded-md text-sm font-bold">
              Bank Details{" "}
            </button>
            <button className="px-3 py-1 m-1 bg-gray-100 text-gray-700 rounded-md text-sm font-bold">
              UPI Payment
            </button>
          </div> */}

          <div className="border mx-3 border-gray-200 rounded-md px-3 py-4">
            <form className="grid grid-cols-2 gap-4">
              <div className="mb-2 text-left items-center">
                <label className="inline-block w-full text-left text-gray-500 font-semibold required mx-2 mb-1 text-xs">
                  Account Name
                </label>
                <input
                  required
                  autoComplete="off"
                  placeholder="Enter account holder name"
                  name="accountName"
                  value={formData?.bankDetails?.accountName}
                  onChange={handleChange}
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
                  name="accountNumber"
                  value={formData?.bankDetails?.accountNumber}
                  onChange={handleChange}
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
                  name="accountHolderNumber"
                  value={formData?.bankDetails?.accountHolderName}
                  onChange={handleChange}
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
                  name="swiftAddress"
                  value={formData?.bankDetails?.swiftAddress}
                  onChange={handleChange}
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
                  placeholder="Enter bank address"
                  name="bankAddress"
                  value={formData?.bankDetails?.bankAddress}
                  onChange={handleChange}
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
              onClick={() => handleDownloadPDF(formData)}
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
