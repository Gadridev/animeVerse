import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFavorite } from "../../../api/favorites";

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}