// components/BillingInfo.tsx
import React from "react";

const BillingInfo: React.FC = () => {
  return (
    <div className="bg-white  p-4 rounded shadow-md mt-4">
        <h4 className="text-md font-semibold">Billing</h4>
      <div className=" lg:flex lg:justify-between">
        <div className="p-2">
          <h2 className="text-sm font-bold"> To:</h2>
          <p>NEXTECH SOLUTIONS</p>
          <p>1234, Elm Street, Suite 567</p>
          <p>San Francisco, CA, USA, 94103</p>
          <p>nextechsolutions@support.com</p>
          <p>(415) 789-1234</p>
          <p>
            For more information, check{" "}
            <a href="#" className="text-blue-500">
              Tax Details
            </a>
            .
          </p>
        </div>
        <div className="p-2">
          <h2 className="text-sm font-bold">From:</h2>
          <p>NEXTECH SOLUTIONS</p>
          <p>1234, Elm Street, Suite 567</p>
          <p>San Francisco, CA, USA, 94103</p>
          <p>nextechsolutions@support.com</p>
          <p>(415) 789-1234</p>
          <p>
            For more information, check{" "}
            <a href="#" className="text-blue-500">
              Tax Details
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillingInfo;
