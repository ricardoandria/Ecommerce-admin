"use client";
import Header from "@/components/Header";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { CodeIcon, Locate, Mail, MailIcon, Phone } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {};

type userFormValues = {
  firstname: string;
  lastname: string;
  addresse: string;
  numeroTelephone: string;
  email: string;
  code: string;
  password: string;
  image: FileList;
};

const Profile = (props: Props) => {
  const { theme } = useTheme();
  const { register, handleSubmit, setValue } = useForm<userFormValues>();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setValue("image", [file] as any);
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div className="flex flex-col gap-2">
      <Header title="Profile" inputSearch={false} />
      <div className=" w-full flex flex-col gap-2 lg:flex-row ">
        <div className="flex flex-col gap-4 w-full lg:w-[40%] xl:w-[30%] ">
          <div className="border border-2 flex flex-col gap-2 justify-center items-center px-4 w-full h-[300px] ">
            <div className="w-[100px] h-[100px] rounded-full">
              <Image
                src="https://buffer.com/resources/content/images/resources/wp-content/uploads/2015/03/adjust-tie.jpeg"
                alt="photo de profile"
                width={70}
                height={70}
                className="rounded-full w-[100px] h-[100px] object-cover"
              />
            </div>

            <p
              className={`font-semibold text-sm md:text-xl ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              Andriamahandry Ricardo
            </p>
            <span
              className={` ${
                theme === "light"
                  ? "bg-[#0c142c] text-white"
                  : "bg-white text-[#0c142c]"
              }  px-3 py-1 rounded-full `}
            >
              Admin
            </span>

            <button className="bg-red-400 px-3 py-2 text-white font-semibold">
              Se deconnecter
            </button>
          </div>
          <div className="border border-2 flex flex-col gap-4 p-4  w-full h-[220px]">
            <div className="flex gap-3 ">
              <Mail
                className={`${
                  theme !== "light" ? "text-white" : "text-black"
                } text-semibold`}
              />
              <span
                className={`${
                  theme !== "light" ? "text-white" : "text-black"
                } text-semibold`}
              >
                ricalq@gmail.com
              </span>
            </div>
            <div className="flex gap-3 ">
              <Phone
                className={`${
                  theme !== "light" ? "text-white" : "text-black"
                } text-semibold`}
              />
              <span
                className={`${
                  theme !== "light" ? "text-white" : "text-black"
                } text-semibold`}
              >
                +261 34 99 218 19
              </span>
            </div>
            <div className="flex gap-3 ">
              <TwitterLogoIcon
                className={`${
                  theme !== "light" ? "text-white" : "text-black"
                } text-semibold`}
              />
              <span
                className={`${
                  theme !== "light" ? "text-white" : "text-black"
                } text-semibold`}
              >
                Ricardo
              </span>
            </div>

            <div className="flex gap-3 ">
              <CodeIcon
                className={`${
                  theme !== "light" ? "text-white" : "text-black"
                } text-semibold`}
              />
              <span
                className={`${
                  theme !== "light" ? "text-white" : "text-black"
                } text-semibold`}
              >
                301
              </span>
            </div>
            <div className="flex gap-3 ">
              <Locate
                className={`${
                  theme !== "light" ? "text-white" : "text-black"
                } text-semibold`}
              />
              <span
                className={`${
                  theme !== "light" ? "text-white" : "text-black"
                } text-semibold`}
              >
                Fianarantsoa Tanambao annexe cite
              </span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[60%] xl:w-[70%] md:border p-2">
          <form
            className="flex flex-col justify-between h-full"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-2">
              <input
                {...register("firstname")}
                placeholder="Nom"
                className="p-2 border border-gray-300  lg:w-full rounded focus:outline-none focus:border-2 focus:border-[#080c14]"
              />
              <input
                {...register("lastname")}
                placeholder="prenom"
                className="p-2 border border-gray-300  lg:w-full rounded focus:outline-none focus:border-2 focus:border-[#080c14]"
              />
              <input
                {...register("addresse")}
                placeholder="Addresse"
                className="p-2 border border-gray-300  lg:w-full rounded focus:outline-none focus:border-2 focus:border-[#080c14]"
              />
              <input
                {...register("numeroTelephone")}
                placeholder="Numero Telephone"
                className="p-2 border border-gray-300  lg:w-full rounded focus:outline-none focus:border-2 focus:border-[#080c14]"
              />

              <input
                {...register("code")}
                placeholder="Code"
                className="p-2 border border-gray-300  lg:w-full rounded focus:outline-none focus:border-2 focus:border-[#080c14]"
              />
              <input
                {...register("password")}
                placeholder="Mot de passe"
                className="p-2 border border-gray-300  lg:w-full rounded focus:outline-none focus:border-2 focus:border-[#080c14]"
                type="password"
              />
              <div className="flex  flex-col  w-full ">
                <label
                  className={` text-center  transition-all delay-100 duration-200  font-bold py-2 px-4 rounded cursor-pointer ${
                    theme !== "light"
                      ? "bg-white text-[#080c14]"
                      : "bg-[#080c146d] hover:bg-[#080c14] text-white"
                  }`}
                >
                  Choisir un image
                  <input
                    type="file"
                    {...register("image")}
                    ref={fileRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                {selectedFile && (
                  <span className="flex justify-center">
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Selected File"
                        className="ml-2 h-1/2 w-1/2 lg:h-[300px] lg:w-[300px] object-cover "
                      />
                    )}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-end items-end">
              <button
                className={`bg-[#080c14] py-2 text-lg font-semibold lg:w-1/2 rounded ${
                  theme !== "light" ? "text-black" : "text-white"
                }`}
                type="submit"
              >
                Modifier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
