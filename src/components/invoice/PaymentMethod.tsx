"use client";
import { useState } from "react";


const PaymentMethod = () => {
  const [method, setMethod] = useState<'card' | 'upi'>('card');

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-2">Mode of Payment</h3>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setMethod('card')}
          className={`p-2 rounded ${method === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Credit/Debit Card
        </button>
        <button
          onClick={() => setMethod('upi')}
          className={`p-2 rounded ${method === 'upi' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          UPI Payment
        </button>
      </div>
      {method === 'card' && (
        <div>
          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Card Holder Name"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      )}
      {method === 'upi' && (
        <div>
          <input
            type="text"
            placeholder="UPI ID"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      )}
      <p className="mt-4 text-green-600 bg-green-00">
        Please make sure to pay the invoice bill within 120 days.
      </p>
    </div>
  );
};

export default PaymentMethod;