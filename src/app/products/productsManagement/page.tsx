import Header from "@/components/Header";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Props = {};

const ProductManagement = (props: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <Header title="Gestion des Produits" />
      <div className="flex justify-end">
        <div className=" bg-[#0c142c] py-2 text-center flex items-center justify-center gap-4 lg:w-[300px] rounded-sm">
          <Plus color="white" />
          <Link href="" className=" md:block text-xl text-white lg:text-lg ">
            Ajouter nouveau produit
          </Link>
        </div>
      </div>
      <div className=" flex items-center gap-2">
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
    </div>
  );
};

export default ProductManagement;
