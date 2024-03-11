import { useMutation } from "@/utils/useMutation";

import { useQueryClient } from "@tanstack/react-query";

export function useDeleteProduct(id: string) {
  const queryClient = useQueryClient();

  return useMutation(`/produit/${id}`, "DELETE", {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Products"],
        refetchType: "all",
      });
    },
  });
}
