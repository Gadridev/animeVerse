import { useQuery } from "@tanstack/react-query";
import { fetchSeasonalAnime } from "../../api/animeApi";

export function useSeasonalAnime(limit = 6) {
  return useQuery({
    queryKey: ["anime", "season", "now", limit],
    queryFn: () => fetchSeasonalAnime({ limit }),
  });
}
