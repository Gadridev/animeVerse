
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLibraryEntry, deleteLibraryEntry, updateLibraryEntry } from "../../../api/library";

export function useSaveLibraryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ animeId, existingId, status, snapshot }) => {
      if (status === "Non ajouté") {
        if (existingId) {
          return deleteLibraryEntry(existingId);
        }
        return null;
      }

      if (existingId) {
        return updateLibraryEntry({ id: existingId, animeId, status, snapshot });
      }
      return createLibraryEntry({ animeId, status, snapshot });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library"] });
    },
  });
}