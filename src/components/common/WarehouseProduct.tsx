import { useEffect, useState } from "react";

interface Item {
  id: number;
  productMRP: string;
  productSKU: string;
  productCode: string;
  productName: string;
  productPrice: string;
  productQuantity: string;
}

const WarehouseProduct = ({
  customFunc,
  initialData,
}: {
  customFunc: any;
  initialData: any[];
}) => {
  const [items, setItems] = useState<Item[]>(
    initialData.map((data) => ({
      id: data?._id ?? "",
      productMRP: data?.mrp ?? "",
      productSKU: data?.sku ?? "",
      productName: data?.name ?? "",
      productPrice: data?.ourPrice ?? "",
      productCode: data?.productCode ?? "",
      productQuantity: data?.quantity ?? 0,
    }))
  );

  useEffect(() => {
    customFunc(items);
    // eslint-disable-next-line
  }, []);

  const handleChange = (
    id: number,
    field: keyof Item,
    value: string | number
  ) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    customFunc(updatedItems);
  };

  return (
    <div className="">
      <div className="overflow-x-auto no-scrollbar">
        <table className="table-auto text-center min-w-full border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-primary text-center text-white">
              {[
                "S. No.",
                "Product Name",
                "Product Code",
                "SKU",
                "Our Price",
                "MRP",
                "Quantity Available",
              ].map((header) => (
                <th
                  key={header}
                  className="p-2 border border-t-0 border-gray-200 text-sm font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index: number) => (
              <tr
                key={index}
                className="odd:bg-white text-sm text-black even:bg-gray-50"
              >
                <td className="border px-2 bg-gray-50 border-gray-300">
                  {index + 1}.
                </td>
                <td className="border px-2 bg-gray-50 border-gray-300">
                  {item?.productName ? item?.productName : "-"}
                </td>
                <td className="border px-2 bg-gray-50 border-gray-300">
                  {item?.productCode ? item?.productCode : "-"}
                </td>
                <td className="border px-2 bg-gray-50 border-gray-300">
                  {item?.productSKU ? item?.productSKU : "-"}
                </td>
                <td className="border px-2 bg-gray-50 border-gray-300">
                  {item?.productPrice ? "₹ " + item?.productPrice : "-"}
                </td>
                <td className="border px-2 bg-gray-50 border-gray-300">
                  {item?.productMRP ? "₹ " + item?.productMRP : "-"}
                </td>
                <td className="border w-20">
                  <input
                    type="number"
                    min={0} // Allow 0 as a valid value
                    value={item.productQuantity}
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? 0 : Number(e.target.value); // Default empty input to 0
                      if (!isNaN(value) && value >= 0) {
                        handleChange(item.id, "productQuantity", value);
                      }
                    }}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    autoFocus={index + 1 === 1}
                    aria-label={`Enter quantity for ${item.productCode}`}
                    className="w-full p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehouseProduct;
