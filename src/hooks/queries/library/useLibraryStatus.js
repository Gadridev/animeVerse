import { useQuery } from "@tanstack/react-query";
import { fetchLibraryStatusByAnimeId } from "../../../api/library";

export function useLibraryStatus(animeId) {
  console.log(animeId)
  return useQuery({
    queryKey: ["library", animeId],
    queryFn: () => fetchLibraryStatusByAnimeId(Number(animeId)),
    enabled: Boolean(animeId),
    select: (data) => data?.[0] ?? null,
  });
}
