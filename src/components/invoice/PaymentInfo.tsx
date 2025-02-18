// components/PaymentInfo.tsx
import React from "react";

const PaymentInfo: React.FC = () => {
  return (
    <div className="bg-white border border-gray-100 h-fit p- rounded">
      <h2 className="text-md font-semibold">Mode Of Payment</h2>
      <div>
        <div className="mt-5 text-xs font-semibold text-gray-600">
          <span className="font-semibold text-gray-400 text-sm">
            UPI Payment:
          </span>{" "}
          Spruko@upi
        </div>
        <div className="mt-5 text-xs font-semibold text-gray-600 ">
          <span className="font-semibold text-gray-400 text-xs">
            Name on UPI Account:
          </span>{" "}
          Henry Milo
        </div>
        <div className="mt-5 text-xs font-semibold text-gray-600">
          <span className="font-semibold text-gray-400 text-xs">
            Total Amount:
          </span>{" "}
          <span className="text-green-500">

          $3,846.53
          </span>
        </div>
        <div className="mt-5 text-xs font-semibold text-gray-600">
          <span className="font-semibold text-gray-400 text-xs">Due Date:</span>{" "}
          28 June, 2024 - <span className="text-red-500">18 days due</span>
        </div>
        <div className="mt-5 text-xs font-semibold text-gray-600">
          <span className="font-semibold text-gray-400 text-xs">
            Invoice Status:
          </span>{" "}
          <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-yellow-600/20">
            Processing
          </span>
        </div>
      </div>
      <div className="mb-1 text-center items-center">
        <p className="bg-green-100 rounded my-2 text-green-700 text-xs font-semibold py-3 px-4 text-left">
          Please Make sure to pay the invoice bill within 120 days.
        </p>
      </div>
    </div>
  );
};

export default PaymentInfo;
