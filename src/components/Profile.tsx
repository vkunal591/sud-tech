// import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";

const Profile = () => {
  // const router = useRouter();
  const { user, logout } = useAuth();
  return (
    <div className="group relative">
      <p className="uppercase min-h-7 cursor-pointer min-w-7 h-7 w-7 flex justify-center items-center text-lg font-bold aspect-square rounded-full bg-blue-500 text-white">
        {user?.fullName.charAt(0)}
      </p>
      <div className="opacity-0 hidden group-hover:block group-hover:opacity-100 bg-whiteBg shadow-md border border-secondary absolute right-0 rounded-xl">
        <div className="border-b border-secondary px-4 pt-3 pb-3">
          <p className="font-bold text-xl capitalize">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="text-sm text-gray-500 pt-1">
            Ph. Number: {user?.mobile}
          </p>
        </div>
        <div className="overflow-hidden">
          <p
            onClick={logout}
            className="flex hover:bg-infobg hover:rounded-b-xl cursor-pointer items-center border-t border-secondary p-4 gap-2"
          >
            <IoLogOutOutline className="text-xl text-gray-400" />
            <span className="text-sm text-iconBlack font-semibold">
              Sign out
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
