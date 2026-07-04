
import { useQuery } from "@tanstack/react-query";
import { fetchAllRatings } from "../../../api/ratings";

export function useAllRatings() {
  return useQuery({
    queryKey: ["ratings"],
    queryFn: fetchAllRatings,
  });
}