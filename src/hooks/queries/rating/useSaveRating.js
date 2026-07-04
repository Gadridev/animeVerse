
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRating, updateRating } from "../../../api/ratings";

export function useSaveRating(id) {
  const queryClient = useQueryClient();
  const animeId=Number(id)
  return useMutation({
    mutationFn: async ({ existingId, rating, note ,snapshot}) => {
      console.log(existingId)
      if (existingId) {
        console.log("testing")
        return updateRating({ id: existingId, animeId, rating, note,snapshot });
      }
      return createRating({ animeId, rating, note ,snapshot});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings", animeId] });
    },
  });
}