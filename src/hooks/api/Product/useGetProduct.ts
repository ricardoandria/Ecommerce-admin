import { useQuery } from "@/utils/useQuery";
import { Product } from "./type";

export const useGetProduct = () => {
  return useQuery<Product[]>(["Products"], "/produit");
};
