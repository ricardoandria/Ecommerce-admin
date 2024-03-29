import { X } from "lucide-react";
import { useTheme } from "next-themes";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useAddProduct } from "@/hooks/api/Product/useAddProduct";
import { Product } from "@/hooks/api/Product/type";

type Props = {
  toggle: boolean;
  onClose: () => void;
};

type FormValues = {
  name: string;
  price: string;
  stock: string;
  categorie: string;
  image: FileList;
};

const ProductModal = ({ toggle, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { theme } = useTheme();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  // const [selectedCategory, setSelectedCategory] = useState("Ordinateur");
  const { mutate } = useAddProduct();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedFile(file.name);
      setValue("image", [file] as any);
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("categorie", data.categorie);

    console.log(data.image[0].name);

    if (selectedFile) {
      formData.append("image", data.image[0].name);
    }

    try {
      await mutate(formData, { onSettled: onClose });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {toggle ? (
        <div
          ref={modalRef}
          className={`w-[90%] h-[90%]  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl p-4 ${
            theme !== "light"
              ? "bg-[#080c14] text-white"
              : "bg-white text-[#080c14]"
          }`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Nouveau Produit</h2>
            <X onClick={onClose} className="cursor-pointer" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 justify-center mt-5 lg:flex-row"
          >
            <div className="flex  flex-col  w-full lg:w-1/2">
              <label
                className={` text-center  transition-all delay-100 duration-200  font-bold py-2 px-4 rounded cursor-pointer ${
                  theme !== "light"
                    ? "bg-white text-[#080c14]"
                    : "bg-[#080c146d] hover:bg-[#080c14] text-white"
                }`}
              >
                Choose File
                <input
                  type="file"
                  id="fileInput"
                  {...register("image")}
                  ref={fileInputRef}
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
                      className="ml-2 h-1/2 w-1/2 lg:h-full lg:w-full object-cover "
                    />
                  )}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-4 lg:w-1/2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 md:flex-row lg:flex-col justify-center">
                  <input
                    {...register("name")}
                    placeholder="name"
                    className="p-2 border border-gray-300 md:w-1/2 lg:w-full rounded focus:outline-none focus:border-2 focus:border-[#080c14]"
                  />
                  <input
                    {...register("price")}
                    placeholder="price"
                    className="p-2 border border-gray-300 md:w-1/2 lg:w-full rounded focus:outline-none focus:border-2 focus:border-[#080c14]"
                  />
                </div>

                <div className="flex  flex-col gap-2">
                  <Label htmlFor="area">Categorie: </Label>
                  <select
                    {...register("categorie")}
                    className="p-2 border rounded focus:outline-none  focus:border-[#080c14] appearance-none"
                  >
                    <option className="bg-white text-black">Ordinateur</option>
                    <option className="bg-white text-black">Tablette</option>
                    <option className="bg-white text-black">Telephone</option>
                    <option className="bg-white text-black">Ecouteur</option>
                  </select>
                </div>
                <input
                  {...register("stock")}
                  placeholder="Stock"
                  className="p-2 border w-1/2 border-gray-300 rounded focus:outline-none focus:border-2 focus:border-[#080c14]"
                />
              </div>

              <button
                type="submit"
                className={`w-full   py-3 rounded-lg text-xl font-semibold ${
                  theme !== "light"
                    ? "bg-white text-[#080c14]"
                    : "bg-[#080c146d] hover:bg-[#080c14] text-white"
                }`}
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default ProductModal;
