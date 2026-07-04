
import { useQuery } from "@tanstack/react-query";
import { fetchRatingByAnimeId } from "../../../api/ratings";

export function useAnimeRating(animeId) {
  return useQuery({
    queryKey: ["ratings", animeId],
     queryFn: async () => {
      const result = await fetchRatingByAnimeId(animeId);
      console.log("Raw data before select:", result);
      return result;
    },
    enabled: Boolean(animeId),
    select: (data) => data?.[0] ?? null,
  });
}