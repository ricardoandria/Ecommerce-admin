import { LogOut, User2, UserCircle } from "lucide-react";
import Link from "next/link";
import React, { MutableRefObject, useRef, useState } from "react";

type DropDownProps = {
  isOpen: boolean;
  refDropDown: React.RefObject<HTMLDivElement>;
};

const DropDownProfile = ({ isOpen, refDropDown }: DropDownProps) => {
  return (
    <div className="relative inline-block text-left" ref={refDropDown}>
      {isOpen && (
        <div className=" absolute right-[-40px] top-[-20px] mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Link
              href={`/profile`}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <User2 />
              <span className="font-semibold md:text-lg">Profile</span>
            </Link>
            <Link
              href={`/profile`}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <LogOut />
              <span className="font-semibold md:text-lg">Se deconnecter</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownProfile;
