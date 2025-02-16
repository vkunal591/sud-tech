"use client";

import Link from "next/link";

const Wrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-infobg pt-[70px] ml-[17%]">
      <div className="p-4 pt-2 min-h-screen">{children}</div>
      <p className="flex text-sm p-5 gap-1 text-gray-500 bg-whiteBg justify-center items-center">
        Copywrite © {new Date().getFullYear()}
        <strong className="text-blue-500"> Maskeen</strong>. Designed with ❤️ by
        <strong className="underline text-blue-500">
          <Link href={"https://www.volvrit.com"} target="_blank">
            {" "}
            Volvrit
          </Link>
        </strong>
        . All Rights Reserved
      </p>
    </div>
  );
};

export default Wrapper;
