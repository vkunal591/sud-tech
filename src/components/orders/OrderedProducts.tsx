import Image from "next/image";
import React from "react";
import { IoPrintSharp, IoShareOutline } from "react-icons/io5";

interface Product {
  id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  originalPrice: number;
  discount: string;
  quantity: number;
  trackingId: string;
  imageUrl: string;
  total: number;
}

const OrderedProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Women's Slim Bag",
      color: "Grey",
      size: "Compact",
      price: 545,
      originalPrice: 854,
      discount: "20% OFF",
      quantity: 1,
      trackingId: "#18A78Y65K6202P49P",
      imageUrl: "/assets/products/1.png", // Replace with actual image path
      total: 545,
    },
    {
      id: 2,
      name: "Beautiful Candle Set",
      color: "Blue",
      size: "42",
      price: 85,
      originalPrice: 100,
      discount: "15% OFF",
      quantity: 2,
      trackingId: "#87492652JTTD8969",
      imageUrl: "/assets/products/2.png", // Replace with actual image path
      total: 85,
    },
  ];

  return (
    <div className="mt-8 bg-white rounded shadow-md py-6">
      <h3 className="text-lg font-semibold text-gray-800 px-6  border-b-2 border-gray-100">Ordered Products</h3>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-white text-gray-800 text-sm border-b-2 border-gray-100">
            <tr>
              <th className="py-3 font-semibold px-6">S.no</th>
              <th className="py-3 font-semibold px-6">Product Name</th>
              <th className="py-3 font-semibold px-6">Price</th>
              <th className="py-3 font-semibold px-6">Quantity</th>
              <th className="py-3 font-semibold px-6">Tracking ID</th>
              <th className="py-3 font-semibold px-6">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-b">
                <td className="py-4 text-gray-900 font-semibold px-6">{index + 1 < 10 ? `0${index + 1}` : index + 1}.</td>
                <td className="py-4 px-6 flex items-center space-x-4">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    height={100}
                    width={100}
                    className="border border-gray-100 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-800">{product.name}</p>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full inline-block">
                      {product.discount}
                    </span>
                    <p className="text-sm font-semibold text-gray-400 mt-1">Color: <span className="text-gray-600">{product?.color}</span></p>
                    <p className="text-sm font-semibold text-gray-400">Size: <span className="text-gray-600">{product?.size}</span></p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-pink-500 text-xl font-bold">${product.price}</span>{" "}
                  <span className="line-through text-gray-400">${product.originalPrice}</span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">{product.quantity < 10 ? `0${product.quantity}` : product.quantity}</td>
                <td className="py-4 px-6">
                  <span className="bg-gray-100 text-gray-900 font-normal text-xs px-2 rounded">
                    {product.trackingId}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-900 font-bold font-base">${product.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between space-x-4 px-4">
        <button className="bg-purple-100 text-purple-500 px-2 py-1 text-sm rounded flex items-center space-x-2">
          <IoPrintSharp size={15} className="" />
          <span>Print</span>
        </button>
        <button className="bg-primary text-white px-4 py-1 rounded flex text-sm items-center space-x-2 transition">
        <IoShareOutline size={15} className="" />
          <span>Share Details</span>
        </button>
      </div>
    </div>
  );
};

export default OrderedProducts;
