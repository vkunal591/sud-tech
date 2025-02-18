import { ImParagraphLeft } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";

const Notification = () => {
  return (
    <div className="relative group">
      <IoIosNotifications className="text-3xl group-hover:scale-110 transition cursor-pointer" />
      <span className="bg-orange-400 flex justify-center items-center absolute -top-0.5 -right-0.5 text-[10px] text-white w-4 h-4 min-w-4 min-h-4 aspect-square rounded-full">
        2
      </span>
      <div className="opacity-0 hidden w-80 overflow-hidden group-hover:block group-hover:opacity-100 bg-whiteBg shadow-md border border-secondary absolute right-0 rounded-xl">
        <div className="p-4 bg-whiteBg flex border-b border-secondary justify-between items-center">
          <span className="font-bold">Notifications</span>
          <span className="px-4 py-1 rounded text-white bg-green-500 whitespace-nowrap text-xs">
            2 Unread
          </span>
        </div>
        <div className="bg-whiteBg p-4 space-y-2">
          <div className="flex items-start gap-3">
            <div className="bg-blue-200 p-1.5 w-fit rounded-full">
              <div className="bg-blue-500 w-fit p-1.5 rounded-full">
                <ImParagraphLeft className="text-white text-xl" />
              </div>
            </div>
            <div>
              <p className="font-bold text-sm">Rishabh Gupta</p>
              <h4 className="text-xs text-gray-500">Profit</h4>
              <h3 className="text-xs text-gray-400">7 min ago</h3>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-200 p-1.5 w-fit rounded-full">
              <div className="bg-blue-500 w-fit p-1.5 rounded-full">
                <ImParagraphLeft className="text-white text-xl" />
              </div>
            </div>
            <div>
              <p className="font-bold text-sm">Rishabh Gupta</p>
              <h4 className="text-xs text-gray-500">Profit</h4>
              <h3 className="text-xs text-gray-400">7 min ago</h3>
            </div>
          </div>
          <button className="bg-blue-500 text-white rounded-md px-4 w-full py-1">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
