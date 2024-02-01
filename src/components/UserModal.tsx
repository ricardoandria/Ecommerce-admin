import {
  BoxIcon,
  Check,
  CheckCheck,
  CodeIcon,
  Command,
  LocateIcon,
  LucideListOrdered,
  MailIcon,
  User,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { Label } from "@/components/ui/label";
import Image from "next/image";

type Props = {
  toggle: boolean;
  onClose: () => void;
};

type FormValues = {
  nom: string;
  prix: string;
  stock: number;
  categorie: string;
  image: FileList;
};

const UserModal = ({ toggle, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { theme } = useTheme();

  return (
    <>
      {toggle ? (
        <>
          <div className=" bg-gray-100 opacity-75 absolute top-0 left-0  w-full h-full"></div>
          <div
            ref={modalRef}
            className={`w-[90%] h-[90%] flex flex-col items-center  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl p-4 ${
              theme !== "light"
                ? "bg-[#080c14] text-white"
                : "bg-white text-[#080c14]"
            }`}
          >
            <X
              className="bg-gray-300 w-[35px] h-[35px] rounded-full cursor-pointer"
              onClick={onClose}
            />
            <div>
              <Image
                src="/Assets/macbook-pro.png"
                alt="Photo de profile"
                width={500}
                height={500}
              />
            </div>
            <div className="flex flex-col  w-1/2 gap-2">
              <div className="flex gap-2 flex-row-reverse w-full justify-between">
                <User />
                <p className="font-bold">ANDRIAMAHANDRY Ricardo</p>
              </div>
              <div className="flex gap-2 flex-row-reverse w-full justify-between">
                <LocateIcon />
                <p className="font-bold">Tanambao Fianarantsoa</p>
              </div>
              <div className="flex gap-2 flex-row-reverse w-full justify-between">
                <MailIcon />
                <p className="font-bold">ricardo@gmail.com</p>
              </div>
              <div className="flex gap-2 flex-row-reverse w-full justify-between">
                <CodeIcon />
                <p className="font-bold">301</p>
              </div>
              <div className="flex gap-2 flex-row-reverse w-full justify-between">
                <Check />
                <p className="font-bold">Active</p>
              </div>
              <div className="flex gap-2 flex-row-reverse w-full justify-between">
                <BoxIcon />
                <p className="font-bold">Dernier Commande</p>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default UserModal;
