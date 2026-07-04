import { useQuery } from "@tanstack/react-query";
import { fetchAnimeById } from "../../../api/animeApi";

export function useAnimeDetails(id) {
  return useQuery({
    queryKey: ["anime", "details", id],
    queryFn: () => fetchAnimeById(id),
    enabled: Boolean(id),
  });
}
