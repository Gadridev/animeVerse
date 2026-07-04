import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchAnimeCatalogue } from "../../../api/animeApi";

export function useAnimeCatalogue({ query, genre, type, page, limit = 20 }) {
  return useQuery({
    queryKey: ["anime", "catalogue", { query, genre, type, page, limit }],
    queryFn: () =>
      fetchAnimeCatalogue({
        q: query || undefined,
        genres: genre || undefined,
        type: type || undefined,
        page,
        limit,
      }),
    placeholderData: keepPreviousData,
  });
}
