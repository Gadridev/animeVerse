import { useQuery } from "@tanstack/react-query";
import { fetchCharacterById } from "../../../api/characterApi";

export function useOneCharacter(id) {
  return useQuery({
    queryKey: ["anime", "character", id],
    queryFn: () => fetchCharacterById(id),
    enabled: Boolean(id),
  });
}
