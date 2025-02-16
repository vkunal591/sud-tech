// components/InvoiceDetails.tsx
import Image from "next/image";
import React from "react";

const InvoiceDetails: React.FC = () => {
  return (
    <div className="lg:flex justify-between items-center">
      <div className="lg:w-2/3">
        <div className="flex mb-2">
          <label className="block items-center text-sm">Invoice No:</label>
          <p
            className={` text-green-500 font-semibold text-md px-2 rounded`}
          >#INV35230</p>
        </div>
        <div className="flex  mb-2">
          <label className="inline-block text-sm">
            Issued Date:
          </label>
          <p
            className={` text-primary text-sm px-2 rounded`}
          >15, April 2024</p>
        </div>
      </div>
      <div className="lg:1/3 text-right m-2">
        <Image
          src={"/assets/logo/logo.jpg"}
          alt={"logo"}
          width={85}
          height={75}
          className="inline "
        />
      </div>
    </div>
  );
};

export default InvoiceDetails;
