import { useMutation } from "@/utils/useMutation";
import { Product } from "./type";
import { useQueryClient } from "@tanstack/react-query";

type Param = Omit<Product, "_id">;

export function useAddProduct() {
  const queryClient = useQueryClient();
  return useMutation<FormData, Param>(
    "/produit/cree",
    "POST",
    {
      // TODO use optimistic update instead of invalidation
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["Products"],
          refetchType: "all",
        });
      },
    },
    undefined,
    true
  );
}
