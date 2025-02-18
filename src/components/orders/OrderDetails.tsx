import React from "react";
import OrderStatus from "./OrderStatus";
import OrderedProducts from "./OrderedProducts";

const OrderDetails: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-0">
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b-2 border-gray-100 p-6 py-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Order Details
              <p className="text-sm text-gray-500 mt-0">
                Ordered Date:{" "}
                <span className="font-medium text-gray-800">5th Mar, 2024</span>
              </p>
            </h2>
            <button className="bg-[#8b7eff] mt-3 text-white font-semibold px-8 py-2 rounded-3xl hover:bg-indigo-600 transition">
              Go to List
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-2 p-6 pt-2">
          {/* Customer Details */}
          <div>
            <h3 className="text-md font-bold text-gray-800">
              Customer Details:
            </h3>
            <div className="flex ">
              <p className="mr-5 w-1/3">
                <span className="text-sm font-semibold">Sophia Mitchell</span>
              </p>
              <p className="text-xs w-2/3 font-semibold text-gray-600">
                <span className="block font-semibold text-gray-400">Email ID:</span>{" "}
                sophiamitchell@mail.mail
              </p>
            </div>
            <p className="text-xs w-full font-semibold text-gray-600">
              <span className="block font-semibold text-gray-400"> Phone Number:</span>{" "}
              +44-7896-123456
            </p>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-md font-bold text-gray-800">
              Shipping Address:
            </h3>
            <div className="flex py-2 px-1">
              <div className="w-1/2">
                <p className="">
                  <span className="text-sm font-semibold">Sophia Mitchell</span>
                </p>
                <p className="text-sm font-semibold my-1 text-gray-600">
                  sophiamitchell@mail.mail
                </p>
                <p className="text-sm w-full font-semibold text-gray-600">
                  +44-7896-123456
                </p>
              </div>
              <div className="px-1 w-1/2 text-left">
                <p className="text-sm/[15px] px-1 font-normal text-gray-900">
                  <span className="block my-1">
                    55B Baker Street, Suite 22,
                  </span>{" "}
                  <span className="block my-1">Kensington Square,</span>
                  <span className="bock my-1">
                    Near City Tower, 45678, London, UK
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:flex">
          {/* Order Summary */}
          <div className="col mt-6 mx-2 lg:w-1/2">
            <h3 className="text-lg font-semibold text-gray-800">
              Order Summary:
            </h3>
            <div className="bg-gray-100 p-2 rounded mt-4 space-y-2">
              <div className="overflow-x-auto rounded-sm">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal  text-gray-500 whitespace-nowrap dark:text-white"
                      >
                        SubTotal
                      </th>
                      <td className="px-6 py-1 text-right font-bold text-gray-700 whitespace-nowrap dark:text-white">
                        {"$680.98"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal  text-gray-500 whitespace-nowrap dark:text-white"
                      >
                        Discount
                      </th>
                      <td className="px-6 py-1 text-right font-bold text-green-600 whitespace-nowrap dark:text-white">
                        {"20% - $136.20"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal  text-gray-500 whitespace-nowrap dark:text-white"
                      >
                        Delivery Charges
                      </th>
                      <td className="px-6 py-1 text-right font-bold text-red-600 whitespace-nowrap dark:text-white">
                        {"-$5"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal  text-gray-500 whitespace-nowrap dark:text-white"
                      >
                        Service Tax(18%)
                      </th>
                      <td className="px-6 py-1 text-right font-bold text-gray-700 whitespace-nowrap dark:text-white">
                        {"-$198.56"}
                      </td>
                    </tr>{" "}
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal  text-gray-500 whitespace-nowrap dark:text-white"
                      >
                        Total
                      </th>
                      <td className="px-6 py-1 text-2xl text-right font-semibold text-gray-700 whitespace-nowrap dark:text-white">
                        <span className="text-sm text-gray-400 line-through">
                          {"$680.98"}
                        </span>{" "}
                        {"$420.22"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Order Info */}
          <div className="col mt-6 mx-2 lg:w-1/2">
            <h3 className="text-lg font-semibold text-gray-800">Order Info:</h3>
            <div className="bg-gray-100 p-2 rounded mt-4 space-y-2">
              <div className="overflow-x-auto rounded-sm">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal  text-gray-500 whitespace-nowrap dark:text-white"
                      >
                        Ordert ID :
                      </th>
                      <td className="px-6 py-1 text-right font-bold text-gray-700 whitespace-nowrap dark:text-white">
                        {"#53523532"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal  text-gray-500 whitespace-nowrap dark:text-white"
                      >
                        Total Items :
                      </th>
                      <td className="px-6 py-1 text-right font-bold text-gray-600 whitespace-nowrap dark:text-white">
                        <span className="inline-flex items-center rounded-3xl bg-blue-500 px-2 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
                          {"02 Products"}
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-600 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal  text-gray-500 whitespace-nowrap dark:text-white"
                      >
                        Order Date :
                      </th>
                      <td className="px-6 py-1 text-right font-bold text-gray-600 whitespace-nowrap dark:text-white">
                        {"05th Mar, 2024"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-600 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal  text-gray-500 whitespace-nowrap dark:text-white"
                      >
                        Delivered By :
                      </th>
                      <td className="px-6 py-1 text-right font-bold text-gray-700 whitespace-nowrap dark:text-white">
                        {"16th Mar, 2024"}
                      </td>
                    </tr>{" "}
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal  text-gray-500 whitespace-nowrap dark:text-white"
                      >
                        Status :
                      </th>
                      <td className="px-6 py-1 text-2xl text-right font-semibold text-gray-700 whitespace-nowrap dark:text-white">
                        <span className="inline-flex items-center rounded-3xl bg-[#8b7eff] px-2 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
                          {"Shipping..."}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <OrderStatus />
      </div>
      <OrderedProducts />
    </div>
  );
};

export default OrderDetails;
