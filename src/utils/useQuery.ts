import {
  UseQueryOptions,
  useQuery as useQueryCore,
} from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "./constants";

export const useQuery = <T>(
  queryKey: string[],
  queryFnKey: string,
  options?:
    | (Omit<
        UseQueryOptions<T, unknown, T, string[]>,
        "initialData" | "queryKey"
      > & {
        initialData?: (() => undefined) | undefined;
      })
    | undefined
) => {
  return useQueryCore<T, unknown, T, string[]>({
    queryKey,
    queryFn: async () => {
      const res = await axios.get(`${API_URL}${queryFnKey}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.data;
    },
    ...options,
  });
};
