// components/ItemList.tsx
import React from "react";

const ItemList: React.FC = () => {
  const items = [
    {
      brand: "Stellar Audio (Earbuds)",
      description:
        "Wireless in-ear design, noise isolation, long battery life.",
      quantity: 2,
    },
    {
      brand: "Titan Wear (Smartwatch)",
      description: "Heart rate monitoring, GPS tracking, water-resistant.",
      quantity: 1,
    },
    {
      brand: "Luxe & Co (Handbag)",
      description: "Premium leather, adjustable straps, multiple compartments.",
      quantity: 2,
    },
    {
      brand: "Glow Essentials (Cosmetics Kit)",
      description: "Complete makeup kit with daily essentials.",
      quantity: 1,
    },
    {
      brand: "Breeze Wear (Jacket)",
      description: "Windproof and waterproof material, lightweight.",
      quantity: 1,
    },
  ];

  return (
    <div className="bg-white p-4 rounded overflow-x-auto mt-4">
      <h2 className="text-lg font-bold">Item List</h2>
      <table className=" lg:table-fixed text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-3 font-semibold py-1">Brand Name</th>
            <th className="px-3 font-semibold py-1">Description</th>
            <th className="px-3 font-semibold py-1">Quantity</th>
            <th className="px-3 font-semibold py-1">Price Per Unit</th>
            <th className="px-3 font-semibold py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border">
              <td className=" px-3 py-1">{item.brand}</td>
              <td className="  text-gray-400 px-3 py-1">{item.description}</td>
              <td className=" text text-gray-600 font-semibold px-3 py-1">
                {item.quantity}
              </td>
              <td className=" text-gray-600 font-semibold px-3 py-1">
                {"$" + item.quantity}
              </td>
              <td className=" text-gray-600 font-semibold px-3 py-1">
                {"$" + item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
