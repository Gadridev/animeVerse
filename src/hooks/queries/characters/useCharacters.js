import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchCharactersList } from "../../../api/characterApi";

export function useCharactersList({ query, page = 1, limit = 20 }) {
  return useQuery({
    queryKey: ["anime", "characters-list", { query, page, limit }],
    queryFn: () =>
      fetchCharactersList({
        q: query || undefined,
        page,
        limit,
      }),
    placeholderData: keepPreviousData,
  });
}