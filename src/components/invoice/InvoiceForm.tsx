"use client";
// InvoiceForm.tsx
import Image from "next/image";
import BillingSection from "./BillingSection";
import ProductRow from "./ProductRow";
import { IoDocument, IoDownload, IoSend } from "react-icons/io5";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { handleDownloadPDF } from "@/hooks/pdfFormat";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const InvoiceForm = ({ responseData }: any) => {
  const route = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState<any>();
  const [formData, setFormData] = useState({
    invoiceNumber: responseData?.invoiceNumber || "",
    invoiceDate: "",
    paymentNumber: "",
    to: responseData?.companyName || "",
    issuedDate: "",
    vesselImoNo: responseData?.vesselImoNo || "",
    vesselName: responseData?.vesselName || "",
    vesselNumber: responseData?.vesselImoNo || "",
    co: "",
    dueDate: dayjs(responseData?.dueDate).format("YYYY/MM/DD") || "",
    yardPaymentDueDate:
      dayjs(responseData?.yardPaymentDueDate).format("YYYY/MM/DD") || "",
    totalAmount: responseData?.sudInvoiceToOwners || "",
    totalAmountInWords: "",
    mailMessage: "",
    paymentTerms: "",
    remarks: responseData?.remarks || "",
    currency: "",
    billingTo: {
      billingToCompanyName: responseData?.companyName || "",
      billingToStreetAddress: responseData?.street || "",
      billingToLandmark: responseData?.landmark || "",
      billingToCity: responseData?.city || "",
      billingToCountry: responseData?.country || "",
      billingToPincode: responseData?.pinCode || "",
      billingToEmail: responseData?.email || "",
      billingToPhoneNumber: responseData?.mobileNo || "",
    },
    billingFrom: {
      billingFromCompanyName: "",
      billingFromStreetAddress: "",
      billingFromLandmark: "",
      billingFromCity: "",
      billingFromCountry: "",
      billingFromPincode: "",
      billingFromEmail: "",
      billingFromPhoneNumber: "",
    },
    bankDetails: {
      accountName: "",
      accountNumber: "",
      accountHolderName: "",
      swiftAddress: "",
      bankAddress: "",
    },
  });

  useEffect(() => {
    if (responseData) {
      setFormData((prevData) => ({
        ...prevData,
        ...responseData,
        billingTo: { ...prevData.billingTo, ...responseData.billingTo },
        billingFrom: { ...prevData.billingFrom, ...responseData.billingFrom },
        bankDetails: { ...prevData.bankDetails, ...responseData.bankDetails },
      }));
    }
  }, [responseData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      // Handle nested fields separately
      if (name.startsWith("billingTo.")) {
        return {
          ...prevData,
          billingTo: {
            ...prevData.billingTo,
            [name.split(".")[1]]: value,
          },
        };
      }

      if (name.startsWith("billingFrom.")) {
        return {
          ...prevData,
          billingFrom: {
            ...prevData.billingFrom,
            [name.split(".")[1]]: value,
          },
        };
      }

      if (name.startsWith("bankDetails.")) {
        return {
          ...prevData,
          bankDetails: {
            ...prevData.bankDetails,
            [name.split(".")[1]]: value,
          },
        };
      }
      console.log(formData, name, value);
      // Handle top-level fields
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  console.log(
    formData?.dueDate,
    "MKMMML",
    responseData?.dueDate,
    "LLLLL",
    dayjs(responseData?.dueDate, "DD/MM/YYYY").format("DD-MM-YYYY")
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const url = `/api/invoice`;

      setSubmitting(true);
      const response: any = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Invoice Created");
        const fetchUrl = `/api/invoice?page=1&limit=10`;
        const resp = await fetch(fetchUrl);
        const data = await resp.json();
        route.push("/dashboard/billing");
        // if (data?.invoices) props?.setFilteredData(data.invoices);
        // if (data?.total) props?.setPaginate({ total: data.total, page: data.page, limit: data.limit });
      } else {
        return toast.error("Something went wrong! Please check invoice no");
      }
    } catch (error) {
      console.error("Error: ", error);
      return toast.error("Something went wrong!");
    } finally {
      // props.onClose?.();
      setSubmitting(false);
    }
  };

  const paymentStages = [
    {
      key: "1ST",
      placeholder: "1ST PAYMENT TERMS",
      name: "billingFrom.billingFromCity",
      type: "text",
      value: formData?.billingFrom?.billingFromCity,
    },
    {
      key: "2ND",
      placeholder: "2ND PAYMENT TERMS",
      name: "billingFrom.billingFromCountry",
      type: "text",
      value: formData?.billingFrom?.billingFromCountry,
    },
    {
      key: "3RD",
      placeholder: "3RD PAYMENT TERMS",
      name: "billingFrom.billingFromPincode",
      type: "text",
      value: formData?.billingFrom?.billingFromPincode,
    },
    {
      key: "4TH",
      placeholder: "4TH PAYMENT TERMS",
      name: "billingFrom.billingFromEmail",
      type: "text",
      value: formData?.billingFrom?.billingFromEmail,
    },
    {
      key: "5TH",
      placeholder: "5TH PAYMENT TERMS",
      name: "billingFrom.billingFromPhoneNumber",
      type: "text",
      value: formData?.billingFrom?.billingFromPhoneNumber,
    },
    {
      key: "6TH",
      placeholder: "6TH PAYMENT TERMS",
      name: "billingTo.billingToLandmark",
      type: "text",
      value: formData?.billingTo?.billingToLandmark,
    },
    {
      key: "7TH",
      placeholder: "7TH PAYMENT TERMS",
      name: "billingTo.billingToCity",
      type: "text",
      value: formData?.billingTo?.billingToCity,
    },
    {
      key: "8TH",
      placeholder: "8TH PAYMENT TERMS",
      name: "billingTo.billingToCountry",
      type: "text",
      value: formData?.billingTo?.billingToCountry,
    },
    {
      key: "9TH",
      placeholder: "9TH PAYMENT TERMS",
      name: "billingTo.billingToPincode",
      type: "text",
      value: formData?.billingTo?.billingToPincode,
    },
    {
      key: "10TH",
      placeholder: "10TH PAYMENT TERMS",
      name: "billingTo.billingToEmail",
      type: "text",
      value: formData?.billingTo?.billingToEmail,
    },
    {
      key: "FINAL",
      placeholder: "FINAL PAYMENT TERMS",
      name: "bankDetails.accountName",
      type: "text",
      value: formData?.bankDetails?.accountName,
    },
  ];

  const selectedIndex = paymentStages.findIndex(
    (stage) => stage.key === formData.paymentNumber
  );

  console.log(dayjs(responseData?.dueDate).format("YYYY/MM/DD"));

  return (
    <div className="lg:flex lg:gap-4 p-2 px-2">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="lg:flex justify-between items-center gap-4">
            <div className="lg:w-2/3">
              <div className="flex mb-2">
                <label className="inline-block w-1/4 mb-1 text-sm">
                  Invoice No:
                </label>
                <input
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
                <select
                  autoComplete="off"
                  className="w-3/4 text-primary outline text-sm outline-gray-100 px-4 py-1 placeholder:text-gray-400 bg-white rounded"
                  name="paymentNumber"
                  value={formData.paymentNumber}
                  onChange={handleChange}
                >
                  <option value="">Select Payment No</option>
                  <option value="1ST">1ST</option>
                  <option value="2ND">2ND</option>
                  <option value="3RD">3RD</option>
                  <option value="4TH">4TH</option>
                  <option value="5TH">5TH</option>
                  <option value="6TH">6TH</option>
                  <option value="7TH">7TH</option>
                  <option value="8TH">8TH</option>
                  <option value="9TH">9TH</option>
                  <option value="10TH">10TH</option>
                  <option value="FINAL">FINAL</option>
                </select>
              </div>
              <div className="flex mb-2">
                <label className="inline-block w-1/4 mb-1 text-sm">To:</label>
                <input
                  autoComplete="off"
                  placeholder=""
                  className="w-3/4 text-primary outline text-sm outline-gray-100 px-4 py-1 placeholder:text-gray-400 bg-white rounded"
                  type="text"
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
                  Vessel IMO No:
                </label>
                <input
                  autoComplete="off"
                  placeholder="Enter your vessel no"
                  className="w-3/4 text-primary outline text-sm outline-gray-100 px-4 py-1 placeholder:text-gray-400 bg-white rounded"
                  type="text"
                  name="vesselImoNo"
                  value={formData.vesselImoNo}
                  onChange={handleChange}
                />
              </div>
              <div className="flex mb-2">
                <label className="inline-block w-1/4 mb-1 text-sm">
                  Vessel Name:
                </label>
                <input
                  autoComplete="off"
                  placeholder="Enter your vessel name"
                  className="w-3/4 text-primary outline text-sm outline-gray-100 px-4 py-1 placeholder:text-gray-400 bg-white rounded"
                  type="text"
                  name="vesselName"
                  value={formData.vesselName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex mb-2">
                <label className="inline-block w-1/4 mb-1 text-sm">C/O:</label>
                <input
                  autoComplete="off"
                  placeholder=""
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
          <div>
            <h3 className="font-bold mb-2">Address :</h3>

            <input
              type="text"
              placeholder="Full Address"
              name="billingTo.billingToStreetAddress"
              value={formData?.billingTo?.billingToStreetAddress}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            <div>
              <h3 className="font-bold mb-2">Invoice Details :</h3>
              <input
                type="text"
                placeholder="Yard name"
                name="billingFrom.billingFromCompanyName"
                value={formData?.billingFrom?.billingFromCompanyName}
                onChange={handleChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Arrival Date"
                name="billingFrom.billingFromStreetAddress"
                value={formData?.billingFrom?.billingFromStreetAddress}
                onChange={handleChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              {formData?.paymentNumber === "FINAL" && (
                <input
                  type="text"
                  placeholder="Departure Date"
                  name="billingFrom.billingFromLandmark"
                  value={formData?.billingFrom?.billingFromLandmark}
                  onChange={handleChange}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
              )}
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2">PAYMENT DETAILS:</h3>

            {formData.paymentNumber === "1ST" && (
              <input
                type="text"
                placeholder="1ST PAYMENT TERMS"
                name="billingFrom.billingFromCity"
                value={formData?.billingFrom?.billingFromCity}
                onChange={handleChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
            )}

            {formData.paymentNumber === "2ND" && (
              <input
                type="text"
                placeholder="2ND PAYMENT TERMS"
                name="billingFrom.billingFromCountry"
                value={formData?.billingFrom?.billingFromCountry}
                onChange={handleChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
            )}

            {formData.paymentNumber === "3RD" && (
              <input
                type="text"
                placeholder="3RD PAYMENT TERMS"
                name="billingFrom.billingFromPincode"
                value={formData?.billingFrom?.billingFromPincode}
                onChange={handleChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
            )}

            {formData.paymentNumber === "4TH" && (
              <input
                type="text"
                placeholder="4TH PAYMENT TERMS"
                name="billingFrom.billingFromEmail"
                value={formData?.billingFrom?.billingFromEmail}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              />
            )}

            {formData.paymentNumber === "5TH" && (
              <input
                type="text"
                placeholder="5TH PAYMENT TERMS"
                name="billingFrom.billingFromPhoneNumber"
                value={formData?.billingFrom?.billingFromPhoneNumber}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              />
            )}

            {formData.paymentNumber === "6TH" && (
              <input
                type="text"
                placeholder="6TH PAYMENT TERMS"
                name="billingTo.billingToLandmark"
                value={formData?.billingTo?.billingToLandmark}
                onChange={handleChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
            )}

            {formData.paymentNumber === "7TH" && (
              <input
                type="text"
                placeholder="7TH PAYMENT TERMS"
                name="billingTo.billingToCity"
                value={formData?.billingTo?.billingToCity}
                onChange={handleChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
            )}

            {formData.paymentNumber === "8TH" && (
              <input
                type="text"
                placeholder="8TH PAYMENT TERMS"
                name="billingTo.billingToCountry"
                value={formData?.billingTo?.billingToCountry}
                onChange={handleChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
            )}

            {formData.paymentNumber === "9TH" && (
              <input
                type="number"
                placeholder="9TH PAYMENT TERMS"
                name="billingTo.billingToPincode"
                value={formData?.billingTo?.billingToPincode}
                onChange={handleChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
            )}

            {formData.paymentNumber === "10TH" && (
              <input
                type="email"
                placeholder="10TH PAYMENT TERMS"
                name="billingTo.billingToEmail"
                value={formData?.billingTo?.billingToEmail}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              />
            )}

            {formData?.paymentNumber === "FINAL" &&
              paymentStages.map((stage, index) => {
                if (selectedIndex >= index) {
                  return (
                    <input
                      key={stage.key}
                      type={stage.type}
                      placeholder={stage.placeholder}
                      name={stage.name}
                      value={stage.value}
                      onChange={handleChange}
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                  );
                }
                return null;
              })}
          </div>

          <div className="bg-primary text-white mt-4 p-4 rounded mb-6">
            <div className="flex justify-between mb-2">
              <label className="inline-block w-2/4 mb-1 text-sm font-bold">
                Due Date :
              </label>
              <input
                placeholder="Due date"
                className="lg:w-2/4 text-primary outline text-sm outline-gray-100 px-4 py-2 placeholder:text-gray-400 bg-white rounded"
                type="date"
                name="dueDate"
                value={
                  formData?.dueDate
                    ? dayjs(formData.dueDate, "DD/MM/YYYY").format("YYYY-MM-DD")
                    : ""
                }
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label className="inline-block lg:w-2/4 mb-1 text-md font-semibold">
                Total Amount ($)
              </label>
              <input
                autoComplete="off"
                placeholder="Total Amount"
                className="lg:w-2/4 text-primary outline text-sm outline-gray-100 px-4 py-2 placeholder:text-gray-400 bg-white rounded"
                type="number"
                name="totalAmount"
                value={formData?.totalAmount}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label className="inline-block lg:w-2/4 mb-1 text-md font-semibold">
                {"Total Amount In Word (USD)"}
              </label>
              <input
                autoComplete="off"
                placeholder="Total Amount In Word(USD)"
                className="lg:w-2/4 text-primary outline text-sm outline-gray-100 px-4 py-2 placeholder:text-gray-400 bg-white rounded"
                type="text"
                name="totalAmountInWords"
                value={formData.totalAmountInWords}
                onChange={handleChange}
              />
            </div>
          </div>

          {formData.paymentNumber === "FINAL" && (
            <div>
              <h2 className="mb-2">Name For Sign</h2>
              <input
                type="text"
                placeholder="Name for client sign"
                name="billingTo.billingToCompanyName"
                value={formData?.billingTo?.billingToCompanyName}
                onChange={handleChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
            </div>
          )}

          {/* <ProductRow /> */}
          {/* Mode of Payment */}
          {/* <div className="bg-white rounded-md p-4">
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
          </div> */}

          {/* <div className=" mt-4 lg:mt-0 h-fit bg-white shadow rounded-lg py-3">
            <h1 className="text-lg font-semibold text-left px-3 py-2 border-b-2 border-gray-100 text-gray-800">
              Mode Of Payment
            </h1>
            <div className="px-4 py-3">
            <button className="px-3 py-1 m-1 bg-purple-50 text-primary rounded-md text-sm font-bold">
              Bank Details{" "}
            </button>
            <button className="px-3 py-1 m-1 bg-gray-100 text-gray-700 rounded-md text-sm font-bold">
              UPI Payment
            </button>
          </div>

            <div className="border mx-3 border-gray-200 rounded-md px-3 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-2 text-left items-center">
                  <label className="inline-block w-full text-left text-gray-500 font-semibold  mx-2 mb-1 text-xs">
                    Account Name
                  </label>
                  <input
                    autoComplete="off"
                    placeholder="Enter account holder name"
                    name="bankDetails.accountName"
                    value={formData?.bankDetails?.accountName}
                    onChange={handleChange}
                    className={`w-full text-primary outline text-sm  outline-gray-200 px-4 py-2 placeholder:text-gray-400 bg-white rounded`}
                    type="text"
                  />
                </div>
                <div className="mb-2 text-left items-center">
                  <label className="inline-block w-full text-left text-gray-500 font-semibold  mx-2 mb-1 text-xs">
                    A/C number
                  </label>
                  <input
                    autoComplete="off"
                    placeholder="Enter a/c number"
                    name="bankDetails.accountNumber"
                    value={formData?.bankDetails?.accountNumber}
                    onChange={handleChange}
                    className={`w-full text-primary outline text-sm  outline-gray-200 px-4 py-2 placeholder:text-gray-400 bg-white rounded`}
                    type="number"
                  />
                </div>
                <div className="mb-2 text-left items-center">
                  <label className="inline-block w-full text-left text-gray-500 font-semibold  mx-2 mb-1 text-xs">
                    Benificiary Bank Name
                  </label>
                  <input
                    autoComplete="off"
                    placeholder="Enter a/c holder name"
                    name="bankDetails.accountHolderName"
                    value={formData?.bankDetails?.accountHolderName}
                    onChange={(e) => {
                      handleChange(e);
                      console.log(e.target.value);
                    }}
                    className={`w-full text-primary outline text-sm  outline-gray-200 px-4 py-2 placeholder:text-gray-400 bg-white rounded`}
                    type="text"
                  />
                </div>
                <div className="mb-1 text-left items-center">
                  <label className="inline-block w-full text-left text-gray-500 font-semibold  mx-2 mb-1 text-xs">
                    Swift Address:
                  </label>
                  <input
                    autoComplete="off"
                    placeholder="Enter swift address"
                    name="bankDetails.swiftAddress"
                    value={formData?.bankDetails?.swiftAddress}
                    onChange={handleChange}
                    className={`w-full text-primary outline text-sm  outline-gray-200 px-4 py-2 placeholder:text-gray-400 bg-white rounded`}
                    type="text"
                  />
                </div>
                <div className="mb-1 col-span-2 text-left items-center">
                  <label className="inline-block w-full text-left text-gray-500 font-semibold  mx-2 mb-1 text-xs">
                    Beneficiary Bank Address:
                  </label>
                  <input
                    autoComplete="off"
                    placeholder="Enter bank address"
                    name="bankDetails.bankAddress"
                    value={formData?.bankDetails?.bankAddress}
                    onChange={handleChange}
                    className={`w-full text-primary outline text-sm  outline-gray-200 px-4 py-2 placeholder:text-gray-400 bg-white rounded`}
                    type="text"
                  />
                </div>
              </div>
              
            <div className="mb-1 text-center items-center">
              <p className="bg-green-100 rounded my-2 text-green-700 text-xs font-semibold py-3 px-4 text-left">
                Please Make sure to pay the invoice bill within 120 days.
              </p>
            </div>
            </div>
          </div> */}

          <div className="lg:flex lg:justify-between">
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-primary flex  text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => handleDownloadPDF(formData)}
                type="button"
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
              <button
                className="p-2 bg-primary flex text-white rounded"
                type="submit"
              >
                Save Invoice{" "}
                <IoSend width={15} height={15} className="m-auto ml-2" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
