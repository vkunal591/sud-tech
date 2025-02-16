import AuthGuard from "@/components/AuthGuard";
import Wrapper from "@/components/common/Wrapper";
import Header from "@/components/Header";
import BillingInfo from "@/components/invoice/BIllingInfo";
import InvoiceDetails from "@/components/invoice/InvoiceDetails";
import ItemList from "@/components/invoice/ItemList";
import PaymentInfo from "@/components/invoice/PaymentInfo";
import { IoDocument, IoDownload, IoPrint } from "react-icons/io5";

const InvoicePage: React.FC = () => {
  return (
    <AuthGuard>
      <Wrapper>
        <Header
          title="Invoice Details"
          breadcrumbItems={[
            {
              label: "Pages",
              href: "",
            },
            {
              label: "Invoice Details",
              href: "",
            },
          ]}
        />
        <div className="container lg:flex lg:gap-3 rounded mx-auto p-6">
          <div className="bg-white rounded-lg p-4 lg:w-4/5">
            <InvoiceDetails />
            <div className="bg-[#8b7eff] lg:flex lg:justify-between text-white mt-4 p-4 px-6 rounded mb-6">
              <div className="">
                <div className="flex  mb-2">
                  <label className="inline-block  mb-1 font-bold text-3xl">
                    INVOICE
                  </label>
                  <p className="text-3xl font-semibold text-gray-100 mx-2">
                    #1550
                  </p>
                </div>
                <div className="flex  mb-1">
                  <label className="inline-block  mb-1 text-xs font-bold">
                    Due Date :
                  </label>
                  <p className="mx-2 text-xs font-semibold">23 April 2024</p>
                </div>
                <div className="flex mb-2">
                  <label className="inline-block  mb-1 text-xs font-bold">
                    Due Date :
                  </label>
                  <p className="mx-2 text-xs font-semibold">23 April 2024</p>
                </div>
              </div>
              <div className="mb-2 w-4/5 px-3 py-1 h-fit text-right">
                <label className="inline-block w-3/4 lg:mb-6 text-gray-100 font-bold">
                  Total Amount (Outstanding Amount in USD)
                </label>
                <p className="text-3xl font-bold ">$ 5334.04</p>
              </div>
            </div>

            <BillingInfo />
            <ItemList />
            <div className="w-full p-3">
              <table className="table-auto col-span-7 lg:w-2/5 ml-auto text-left">
                <tfoot>
                  <tr className="">
                    <th className="font-semibold  m-2">Sub Total : </th>
                    <td className="m-2  font-semibold text-gray-700">
                      {"$ 563"}
                    </td>
                  </tr>
                  <tr className="">
                    <th className="font-semibold text-sm  m-2">
                      Available Discount :{" "}
                    </th>
                    <td className="m-2 w-1/5 font-semibold text-gray-700">
                      {"$ 353"}
                    </td>
                  </tr>
                  <tr className="">
                    <th className="font-semibold text-sm m-2">
                      Coupon Discount (3.5%) :{" "}
                    </th>
                    <td className="m-2 w-1/5 font-semibold text-gray-700">
                      {"$ 253"}
                    </td>
                  </tr>
                  <tr className="">
                    <th className="font-semibold text-sm m-2">Vat (7.5%) : </th>
                    <td className="m-2 w-1/5  font-semibold text-gray-700">
                      {"$ 453"}
                    </td>
                  </tr>
                  <tr className="">
                    <th className="font-semibold text-sm m-2">
                      Due Till Date :{" "}
                    </th>
                    <td className="m-2 w-1/5 font-semibold text-gray-700">
                      {"$ 133"}
                    </td>
                  </tr>
                  <tr className="">
                    <th className="font-semibold text-sm w-4/5 m-2">
                      Total :{" "}
                    </th>
                    <td className="m-2 w-1/5  font-semibold text-gray-700">
                      {"$ 553"}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="bg-white rounded-md p-4">
              <h3 className="text-sm font-bold mb-2">Note:</h3>
              <textarea
                name="about"
                id="about"
                rows={3}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                If you&lsquo;re not satisfied with the product, you can return the
                unused item within 10 days of the delivery date. For refund
                options, please visit the official website and review the
                available refund policies.
              </textarea>
            </div>

            <div className="flex justify-end">
              <div className="flex space-x-4 mt-4">
                <button className="bg-yellow-500 flex text-white px-2 lg:px-4 py-2 text-sm rounded-md hover:bg-yellow-400">
                  Print{" "}
                  <IoPrint hanging={15} width={15} className="m-auto ml-2" />
                </button>
                <button className="bg-primary flex text-sm text-white px-2 lg:px-4 py-2 rounded-md hover:bg-blue-700">
                  Save As PDF{" "}
                  <IoDocument width={15} height={15} className="m-auto ml-2" />
                </button>
                <button className="bg-green-700 flex text-white px-2 lf:px-3.5 py-2 rounded-md hover:bg-green-600">
                  Download{" "}
                  <IoDownload width={15} height={15} className="m-auto ml-2" />
                </button>
              </div>
            </div>
          </div>
          <div className=" lg:w-1/5 mt-4 lg:mt-0 h-fit p-3 shadow bg-white rounded-lg">
            <PaymentInfo />
          </div>
        </div>
      </Wrapper>
    </AuthGuard>
  );
};

export default InvoicePage;
