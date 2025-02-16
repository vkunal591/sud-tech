// BillingSection.tsx
const BillingSection = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <h3 className="font-bold mb-2">Billing To :</h3>
        <input
          type="text"
          placeholder="Company Name"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Enter Address"
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
        <input
          type="text"
          placeholder="Company Email"
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <h3 className="font-bold mb-2">Billing From :</h3>
        <input
          type="text"
          placeholder="Company Name"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Enter Address"
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
        <input
          type="text"
          placeholder="Email"
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Zip Code"
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        />
        <label htmlFor="currency" className="block m-2 font-semibold">Currency</label>
        <select className="border border-gray-200 p-2 px-2 rounded text-gray-400 text-sm outline-none w-full">
          <option value="">Select Currency</option>
          <option value="">$</option>
          <option value="">₹</option>
        </select>
      </div>
    </div>
  );
};

export default BillingSection;
