import { useQuery } from "@tanstack/react-query";
import { fetchAnimeGenres } from "../../../api/animeApi";

export function useAnimeGenres() {
  return useQuery({
    queryKey: ["anime", "genres"],
    queryFn: fetchAnimeGenres,
    staleTime: 1000 * 60 * 60,
  });
}
