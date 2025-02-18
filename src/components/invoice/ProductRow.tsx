"use client";

import { useState } from "react";
import { IoTrash } from "react-icons/io5";

const ProductRow = () => {
  const [products, setProducts] = useState([
    { name: "", description: "", quantity: 1, price: "", total: 0 },
  ]);

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { name: "", description: "", quantity: 1, price: "", total: 0 },
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedProducts = products.map((product, i) => {
      if (i === index) {
        const updatedProduct = { ...product, [field]: value };
        if (field === "quantity" || field === "price") {
          const quantity = field === "quantity" ? value : product.quantity;
          const price = field === "price" ? value : product.price;
          updatedProduct.total = Number(quantity) * Number(price);
        }
        return updatedProduct;
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="table-auto w-full border-collapse border rounded border-gray-100">
        <thead className="border-gray-100">
          <tr className="bg-white">
            <th className="border p-2 font-semibold">Product Name</th>
            <th className="border p-2 font-semibold">Description</th>
            <th className="border p-2 font-semibold">Quantity</th>
            <th className="border p-2 font-semibold">Price Per Unit</th>
            <th className="border p-2 font-semibold">Total</th>
            <th className="border p-2 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="border-gray-100">
          {products.map((product, index) => (
            <tr key={index}>
              <td className="border p-2">
                <input
                  type="text"
                  className="w-full p-1 border rounded outline outline-gray-200"
                  placeholder="Enter Product"
                  value={product.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  className="w-full p-1 border rounded outline outline-gray-200"
                  placeholder="Enter Description"
                  value={product.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                />
              </td>
              <td className="border p-2 flex text-center items-center">
                <button
                  className="p-1 px-2.5 bg-primary text-white rounded rounded-tr-none rounded-br-none "
                  onClick={() =>
                    handleChange(
                      index,
                      "quantity",
                      Math.max(1, product.quantity - 1)
                    )
                  }
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-16 p-1 px-3 text-center border rounded-none"
                  value={product.quantity}
                  min={1}
                  disabled
                  onChange={(e) =>
                    handleChange(
                      index,
                      "quantity",
                      Math.max(1, parseInt(e.target.value))
                    )
                  }
                />
                <button
                  className="p-1 px-2 bg-primary text-white rounded rounded-tl-none rounded-bl-none "
                  onClick={() =>
                    handleChange(index, "quantity", product.quantity + 1)
                  }
                >
                  +
                </button>
              </td>
              <td className="border p-2 ">
                <input
                  type="number"
                  className="w-full p-1 border rounded"
                  placeholder="Enter Amount"
                  value={product.price}
                  onChange={(e) =>
                    handleChange(index, "price", parseFloat(e.target.value))
                  }
                />
              </td>
              <td className="border p-2">${product.total.toFixed(2)}</td>
              <td className="border text-center p-2">
                <button
                  className="p-2 bg-red-100 text-red-600 rounded"
                  onClick={() => handleRemoveProduct(index)}
                >
                  <IoTrash width={15} height={15} className="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 mr-1 p-2  bg-primary text-white rounded"
        onClick={handleAddProduct}
      >
        + Add Product
      </button>

      <div className="lg:w-full p-3">
        <table className="table-fixed  lg:w-full text-right">
          <tfoot>
            <tr className="">
              <th className="font-semibold w-4/5 m-2">Sub Total : </th>
              <td className="m-2 w-1/5 px-3">  <input
              required
      
              autoComplete="off"
              placeholder="0000.00"
              className={`w-full text-primary outline text-sm  outline-gray-100 px-6 mb-2 py-2 placeholder:text-gray-400 bg-white rounded`}
              type="text"
             
            /></td>
            </tr>
            <tr className="">
              <th className="font-semibold w-4/5 m-2">Available Discount : </th>
              <td className="m-2 w-1/5 px-3">  <input
              required
      
              autoComplete="off"
              placeholder="0000.00"
              className={`w-full text-primary outline text-sm  outline-gray-100 px-6 mb-2 py-2 placeholder:text-gray-400 bg-white rounded`}
              type="text"
             
            /></td>
            </tr>
            <tr className="">
              <th className="font-semibold w-4/5 m-2">Coupon Discount (3.5%) : </th>
              <td className="m-2 w-1/5 px-3">  <input
              required
      
              autoComplete="off"
              placeholder="0000.00"
              className={`w-full text-primary outline text-sm  outline-gray-100 px-6 mb-2 py-2 placeholder:text-gray-400 bg-white rounded`}
              type="text"
             
            /></td>
            </tr>
            <tr className="">
              <th className="font-semibold w-4/5 m-2">Vat (7.5%) : </th>
              <td className="m-2 w-1/5 px-3">  <input
              required
      
              autoComplete="off"
              placeholder="0000.00"
              className={`w-full text-primary outline text-sm  outline-gray-100 px-6 mb-2 py-2 placeholder:text-gray-400 bg-white rounded`}
              type="text"
             
            /></td>
            </tr>
            <tr className="">
              <th className="font-semibold w-4/5 m-2">Due Till Date : </th>
              <td className="m-2 w-1/5 px-3">  <input
              required
      
              autoComplete="off"
              placeholder="0000.00"
              className={`w-full text-primary outline text-sm  outline-gray-100 px-6 mb-2 py-2 placeholder:text-gray-400 bg-white rounded`}
              type="text"
             
            /></td>
            </tr>
            <tr className="">
              <th className="font-semibold w-4/5 m-2">Total : </th>
              <td className="m-2 w-1/5 px-3">  <input
              required
      
              autoComplete="off"
              placeholder="0000.00"
              className={`w-full text-primary outline text-sm  outline-gray-100 px-6 mb-2 py-2 placeholder:text-gray-400 bg-white rounded`}
              type="text"
             
            /></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ProductRow;
