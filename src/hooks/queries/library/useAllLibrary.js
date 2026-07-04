
import { useQuery } from "@tanstack/react-query";
import { fetchAllLibrary } from "../../../api/library";

export function useAllLibrary() {
  return useQuery({
    queryKey: ["library"],
    queryFn: fetchAllLibrary,
  });
}