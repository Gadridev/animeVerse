
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLibraryEntry } from "../../../api/library";
import { deleteRatings } from "../../../api/ratings";

export function useRemoveRatings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRatings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
    },
  });
}