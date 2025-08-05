"use client";
import { IoDocument, IoSend } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { handleDownloadPDF } from "@/hooks/pdfFormat";
import { Fetch } from "@/hooks/apiUtils";
import { endpoints } from "@/data/endpoints";

const formatDate = (date: any) => (date ? dayjs(date).format("YYYY-MM-DD") : "");

const InvoiceForm = (props: any) => {
  const formType = props.formType;
  const responseData = props.data;
  console.log(props.data)
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<any>({
    serviceDate: formatDate(responseData?.serviceDate),
    vesselName: responseData?.vesselName || "",
    vesselImoNo: responseData?.vesselImoNo || "",
    jobDescription: responseData?.jobDescription || "",
    port: responseData?.port || "",
    mt: responseData?.mt || "",
    subject: responseData?.subject || "",
    invoiceDate: formatDate(responseData?.invoiceDate),
    invoiceNumber: responseData?.invoiceNumber || "",
    orderNumber: responseData?.orderNumber || "",
    invoiceTo: responseData?.invoiceTo || "",
    careOf: responseData?.careOf || "",
    address: responseData?.address || "",
    items: responseData?.items || [
      { itemName: "", qty: 0, unit: "", price: 0, amount: 0 },
    ],
    totalAmount: responseData?.totalAmount || 0,
    paymentDueDate: formatDate(responseData?.paymentDueDate),
    actualPaymentAmount: responseData?.actualPaymentAmount || 0,
    actualPaymentDate: formatDate(responseData?.actualPaymentDate),
    remarks: responseData?.remarks || "",
    companyName: responseData?.companyName || "",
  });

  const handleChange = (e: any, index?: number) => {
    const { name, value } = e.target;

    if (name.startsWith("items[")) {
      const match = name.match(/items\[(\d+)\]\.(\w+)/);
      if (match) {
        const idx = parseInt(match[1], 10);
        const field = match[2];
        const updatedItems = [...formData.items];

        // Allow empty string for qty and price so user can backspace
        if (field === "qty" || field === "price") {
          updatedItems[idx][field] = value === "" ? "" : Number(value);
        } else {
          updatedItems[idx][field] = value.toUpperCase();
        }

        // Calculate amount only if qty and price are valid numbers
        const qty = Number(updatedItems[idx].qty);
        const price = Number(updatedItems[idx].price);

        if (!isNaN(qty) && !isNaN(price) && updatedItems[idx].qty !== "" && updatedItems[idx].price !== "") {
          updatedItems[idx].amount = qty * price;
        } else {
          updatedItems[idx].amount = 0;
        }

        // Calculate total amount for all items
        const newTotal = updatedItems.reduce((sum, item) => sum + (typeof item.amount === 'number' ? item.amount : 0), 0);

        return setFormData((prev: any) => ({
          ...prev,
          items: updatedItems,
          totalAmount: newTotal,
        }));
      }
    }

    setFormData((prev: any) => ({
      ...prev,
      [name]: name === "totalAmount" || name.includes("Amount")
        ? Number(value)
        : value.toUpperCase?.() || value,
    }));
  };



  const handleAddItem = () => {
    setFormData((prev: any) => {
      const newItems = [...prev.items, { itemName: "", qty: 0, unit: "", price: 0, amount: 0 }];
      const newTotal = newItems.reduce((sum, item) => sum + item.amount, 0);
      return { ...prev, items: newItems, totalAmount: newTotal };
    });
  };

  const handleRemoveItem = (index: number) => {
    setFormData((prev: any) => {
      const newItems = prev.items.filter((_: any, i: any) => i !== index);
      const newTotal = newItems.reduce((sum: any, item: any) => sum + item.amount, 0);
      return { ...prev, items: newItems, totalAmount: newTotal };
    });
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const url = responseData?._id ? `/api/invoice/${responseData?._id}` : '/api/invoice'
      const result = await fetch(url, {
        method: responseData?._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const response = await result.json();
      console.log(response)
      if (response.success) {
        const fetchUrl = `${endpoints[formType].fetchAll}`;
        const resp: any = await Fetch(fetchUrl, {}, 5000, true, false);
        if (resp?.success) props?.setFilteredData(resp?.data?.result);
        if (resp?.success && resp?.data?.pagination)
          props?.setPaginate(resp?.data?.pagination);
      } else return toast.error("Something went wrong!");
    } catch (error) {
      toast.error("Submission failed.");
    } finally {
      setSubmitting(false);
      props.onClose?.();
    }
  };

  return (
    <div className="lg:flex lg:gap-4 p-2 px-2">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Invoice Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Invoice Number", name: "invoiceNumber" },
              { label: "Invoice Date", name: "invoiceDate", type: "date" },
              { label: "Order Number", name: "orderNumber" },
              { label: "Service Date", name: "serviceDate", type: "date" },
              { label: "Vessel Name", name: "vesselName" },
              { label: "Vessel IMO No", name: "vesselImoNo" },
              { label: "Job Description", name: "jobDescription" },
              { label: "Port", name: "port" },
              { label: "MT", name: "mt" },
              { label: "Subject", name: "subject" },
              { label: "Invoice To", name: "invoiceTo" },
              { label: "Care Of", name: "careOf" },
              { label: "Address", name: "address" },
              { label: "Remarks", name: "remarks" },
              { label: "Company Name", name: "companyName" },
              { label: "Payment Due Date", name: "paymentDueDate", type: "date" },
              { label: "Actual Payment Date", name: "actualPaymentDate", type: "date" },
              { label: "Actual Payment Amount", name: "actualPaymentAmount", type: "number" },
              { label: "Total Amount (USD)", name: "totalAmount", type: "number" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name}>
                <label className="block text-sm mb-1">{label}</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-lg mb-4 border-b pb-1">Invoice Line Items</h3>
            <div className="grid grid-cols-5 gap-2 font-semibold text-sm mb-2">
              <span>Item Name</span>
              <span>Qty</span>
              <span>Unit</span>
              <span>Price</span>
              <span>Amount</span>
            </div>
            {formData.items.map((item: any, index: any) => (
              <div key={index} className="grid grid-cols-5 gap-2 mb-2 items-center">
                <input
                  type="text"
                  name={`items[${index}].itemName`}
                  placeholder="Item Name"
                  value={item.itemName}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  name={`items[${index}].qty`}
                  placeholder="Qty"
                  value={item.qty === 0 ? "" : item.qty}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name={`items[${index}].unit`}
                  placeholder="Unit"
                  value={item.unit}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  name={`items[${index}].price`}
                  placeholder="Price"
                  value={item.price === 0 ? "" : item.price}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  name={`items[${index}].amount`}
                  placeholder="Amount"
                  value={item.amount}
                  disabled
                  className="p-2 border border-gray-300 rounded bg-gray-100"
                />
                {formData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 ml-2 col-span-5 text-left text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Line Item
            </button>
          </div>


          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => handleDownloadPDF(formData)}
              className="bg-primary text-white px-4 py-2 rounded flex items-center"
            >
              Save As PDF <IoDocument className="ml-2" />
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded flex items-center"
              disabled={submitting}
            >
              Save Invoice <IoSend className="ml-2" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
