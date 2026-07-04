import { useQuery } from "@tanstack/react-query";
import { fetchTopAnime } from "../../api/animeApi";

export function useTopAnime(params = {}) {
  return useQuery({
    queryKey: ["anime", "top", params],
    queryFn: () => fetchTopAnime(params),
  });
}
