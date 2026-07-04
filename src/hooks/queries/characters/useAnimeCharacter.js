import { useQuery } from "@tanstack/react-query";
import { fetchAnimeCharacters } from "../../../api/animeApi";

export function useAnimeCharacters(animeId) {
  return useQuery({
    queryKey: ["anime", "characters", animeId],
    queryFn: () => fetchAnimeCharacters(animeId),
    enabled: Boolean(animeId),
  });
}