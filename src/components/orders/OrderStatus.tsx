const OrderStatus: React.FC = () => {
  return (
    <div className="mt-8 bg-white p-6 rounded">
      <h3 className="text-lg font-semibold text-gray-800">Order Status:</h3>
      <div className="flex items-center justify-between bg-gray-100 py-4 px-10 mt-4">
        {/* Status Step */}
        <div className="flex-1 flex flex-col items-center w-1/4 text-center">
          <div className="flex-1 relative left-26 top-4 flex items-start ">
            <div className="h-0.5 bg-[#35bdaa] w-40"></div>
          </div>
          <div className="bg-[#35bdaa] text-white rounded-full w-8 h-8 flex items-center justify-center">
            ✓
          </div>
          <span className="mt-2 text-sm font-semibold text-gray-800">01</span>
          <p className="text-sm text-gray-600">Order Placed</p>
          <p className="text-sm text-gray-600">05th, Mar 2024</p>
        </div>

        <div className="flex-1 flex flex-col items-center w-1/4 text-center">
        <div className="flex-1 relative left-26 top-4 flex items-start ">
            <div className="h-0.5 bg-[#35bdaa] w-40"></div>
          </div>
          <div className="bg-[#35bdaa] text-white rounded-full w-8 h-8 flex items-center justify-center">
            ✓
          </div>
          <span className="mt-2 text-sm font-semibold text-gray-800">02</span>
          <p className="text-sm text-gray-600">Confirmed</p>
          <p className="text-sm text-gray-600">08th, Mar 2024</p>
        </div>


        <div className="flex-1 flex flex-col items-center w-1/4 text-center">
        <div className="flex-1 relative left-26 top-4 flex items-start ">
            <div className="h-0.5 bg-[#ffb748] w-40"></div>
          </div>
          <div className="bg-[#35bdaa] text-white rounded-full w-8 h-8 flex items-center justify-center">
            ✓
          </div>
          <span className="mt-2 text-sm font-semibold text-gray-800">03</span>
          <p className="text-sm text-gray-600">Shipped</p>
          <p className="text-sm text-gray-600">05th, Mar 2024</p>
        </div>

        <div className="flex-1 flex flex-col items-center w-1/4 text-center">
        
          <div className="bg-[#ffb748] text-white rounded-full w-8 h-8 flex items-center justify-center">
            ✓
          </div>
          <span className="mt-2 text-sm font-semibold text-gray-800">04</span>
          <p className="text-sm text-gray-600">Delivered</p>
          <p className="text-sm text-gray-600">16th, Mar 2024</p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
