"use client";
import Header from "@/components/Header";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/DataTable";
import { CellContext, ColumnDef, HeaderContext } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import TanStackTable from "@/components/TanstackTable";
import ProductModal from "@/components/ProductModal";
import { useTheme } from "next-themes";

type Props = {};
type ProductType = {
  image: JSX.Element;
  name: string;
  price: string;
  stock: number;
  category: string;
  rate: number;
  date: string;
};

const Products = (props: Props) => {
  const [toogleModal, setToogleModal] = useState(false);
  const { theme } = useTheme();

  const handleToggleModal = () => {
    setToogleModal(!toogleModal);
  };

  const onClose = () => {
    setToogleModal(false);
  };

  return (
    <div
      className={`flex flex-col gap-1 relative ${
        theme !== "light" ? "text-white" : "text-black"
      }`}
    >
      <Header title="Gestion des Produits" />
      <div className="flex justify-end">
        <div
          className={` py-2 text-center flex items-center justify-center gap-4 w-[40px] lg:w-[300px] rounded-sm ${
            theme !== "light"
              ? "text-[#0c142c] bg-white"
              : "bg-[#0c142c] text-white"
          }`}
          onClick={handleToggleModal}
        >
          <Plus />
          <Link href="" className="hidden lg:block text-xl  lg:text-lg ">
            Ajouter nouveau produit
          </Link>
        </div>
      </div>
      <div className=" flex items-center gap-2 ">
        <Label htmlFor="area">Categorie: </Label>
        <Select defaultValue="billing">
          <SelectTrigger id="area">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="team">Ordinateur</SelectItem>
            <SelectItem value="billing">Tablette</SelectItem>
            <SelectItem value="account">Telephone</SelectItem>
            <SelectItem value="deployments">Ecouteur</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4">
        <TanStackTable />
      </div>
      <ProductModal toggle={toogleModal} onClose={onClose} />
    </div>
  );
};

export default Products;
