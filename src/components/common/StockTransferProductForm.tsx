import { debounce } from "@/hooks/general";
import { useEffect, useState } from "react";

const StockTransferProductForm = ({
  initialData,
  onProductDataChange,
}: {
  initialData: any;
  onProductDataChange: any;
}) => {
  const emptyProduct = {
    _id: "",
    mrp: 0,
    value: 0,
    quantity: 0,
    totalAmount: 0,
    stockInHand: 0,
    productCode: "",
  };
  const [nextId, setNextId] = useState(2);
  const [items, setItems] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);

  const addItem = () => {
    const newItems = [...items, { id: nextId, ...emptyProduct }];
    setItems(newItems);
    setNextId(nextId + 1);
  };

  const deleteItem = (id: number) => {
    const updatedItems = items.filter((item: any) => item.id !== id);
    setItems(updatedItems);
    const data = calculatedFinal(updatedItems);
    onProductDataChange(data, updatedItems);
  };

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setItems([]);
      setProducts(initialData);
    }
  }, [initialData]);

  const getUpdatedCalculated = (data: any) => {
    const value = (data.mrp || 0) * (data.quantity || 1);
    return {
      ...data,
      value: value.toFixed(2),
      totalAmount: value.toFixed(2),
    };
  };

  const handleProductChange = (rowId: number, productCode: string) => {
    const selectedProduct = products.find(
      (product: any) => product.productCode === productCode
    );

    if (selectedProduct) {
      const data = {
        value: 0,
        id: rowId,
        quantity: 1,
        totalAmount: 0,
        product: selectedProduct._id,
        mrp: selectedProduct?.mrp ?? 0,
        stockInHand: selectedProduct?.stockInHand ?? 0,
        productCode: selectedProduct?.productCode ?? "",
      };

      const calculated = getUpdatedCalculated(data);

      setItems((prevItems: any[]) => {
        const existingItemIndex = prevItems.findIndex(
          (item: any) => item.id === rowId // Match by rowId
        );
        let updatedItems;
        if (existingItemIndex !== -1) {
          updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            ...calculated,
          };
        } else updatedItems = [...prevItems, calculated];
        const data = calculatedFinal(updatedItems);
        debounce(onProductDataChange(data, updatedItems), 1000);
        return updatedItems;
      });
    }
  };

  const handleChange = (id: number, field: any, value: string | number) => {
    const updatedItems = items.map((item: any) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    const targetItem = updatedItems.find((item: any) => item.id === id);
    if (targetItem) {
      const calculated = getUpdatedCalculated(targetItem);

      setItems((prevItems: any[]) => {
        const existingItemIndex = prevItems.findIndex(
          (item: any) => item.id === id
        );

        let updatedItems;
        if (existingItemIndex !== -1) {
          updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            ...calculated,
          };
        } else updatedItems = [...prevItems, calculated];
        const data = calculatedFinal(updatedItems);
        onProductDataChange(data, updatedItems);
        return updatedItems;
      });
    }
  };

  const calculatedFinal = (items: any) => {
    const final = {
      netAmount: 0,
      totalValue: 0,
      igstAmount: 0,
      cgstAmount: 0,
      sgstAmount: 0,
      totalQuantity: 0,
      taxableAmount: 0,
      discountAmount: 0,
    };
    items.forEach((item: any) => {
      const taxableAmount = parseFloat(item.taxableAmount) || 0;
      const discountAmount = parseFloat(item.discountAmount) || 0;
      const value = parseFloat(item.value) || 0;
      const totalAmount = parseFloat(item.totalAmount) || 0;
      const quantity = parseFloat(item.quantity) || 0;
      const cgst = parseFloat(item.cgst) || 0;
      const sgst = parseFloat(item.sgst) || 0;

      // Calculate the totals
      final.totalQuantity += quantity;
      final.totalValue += value;
      final.discountAmount += discountAmount;
      final.taxableAmount += taxableAmount;
      final.netAmount += totalAmount;

      if (cgst && taxableAmount > 0) {
        final.cgstAmount += (taxableAmount * cgst) / 100;
      }
      if (sgst && taxableAmount > 0) {
        final.sgstAmount += (taxableAmount * sgst) / 100;
      }
      if (cgst && sgst) {
        final.igstAmount = final.cgstAmount + final.sgstAmount;
      }
    });
    Object.keys(final).forEach((key) => {
      final[key as keyof typeof final] = parseFloat(
        final[key as keyof typeof final].toFixed(2)
      );
    });
    return final;
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-2xl font-extrabold uppercase text-primary">
            Select Product
          </p>
        </div>
        <button
          type="button"
          onClick={addItem}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          + Add Product
        </button>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <table className="table-auto min-w-full border-collapse whitespace-nowrap border border-gray-300">
          <thead>
            <tr className="bg-secondary text-white text-left">
              {[
                "Product Code",
                "List Price",
                "Stock In Hand",
                "Quantity",
                "Value",
                "Total Amount",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="p-2 border text-center capitalize border-gray-300 text-sm font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item: any, index: number) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-white text-black even:bg-gray-50"
                >
                  <td className="border border-gray-300">
                    <select
                      value={item.productCode}
                      onChange={(e) =>
                        handleProductChange(item.id, e.target.value)
                      }
                      className="w-full p-2 focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">--Select Product--</option>
                      {products.map((product: any, index: number) => (
                        <option key={index} value={product.productCode}>
                          {product.name} ({product.productCode})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.mrp ? "₹ " + item.mrp : 0}
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.stockInHand}
                  </td>
                  <td className="border border-gray-300">
                    <input
                      type="number"
                      min={1} // Minimum value is 1
                      max={item.stockInHand} // Set the maximum value to stockInHand
                      value={item.quantity || ""}
                      placeholder="Qty"
                      onChange={(e) => {
                        const enteredValue = Number(e.target.value);
                        const validatedValue = Math.min(
                          enteredValue,
                          item.stockInHand
                        ); // Limit value to stockInHand
                        debounce(
                          handleChange(item.id, "quantity", validatedValue),
                          1000
                        );
                      }}
                      className="w-full p-2 focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="border min-w-20 p-2 border-gray-300">
                    {item.value}
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.totalAmount}
                  </td>
                  <td className="border border-gray-300 text-center">
                    <button
                      onClick={() => deleteItem(item.id)}
                      type="button"
                      className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTransferProductForm;
