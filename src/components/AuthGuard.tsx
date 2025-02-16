"use client";

import Loader from "./common/Loader";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [stateReady, setStateReady] = useState(false);

  useEffect(() => {
    setStateReady(true);
    if (stateReady && token === null) router.push("/auth/login");
    else if (token && pathname === "/") return router.push("/dashboard");
    else return router.push(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, stateReady]);

  if (
    typeof window !== "undefined" &&
    !token &&
    !localStorage.getItem("adminToken")
  ) {
    return <Loader />; // or show a loading spinner
  }

  return <>{token ? children : <Loader />}</>;
};

export default AuthGuard;
