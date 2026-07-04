import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLibraryEntry } from "../../../api/library";

export function useRemoveLibraryEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLibraryEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library"] });
    },
  });
}