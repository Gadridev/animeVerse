import { useFavorites } from "./usefavourite";

export function useIsFavorite(animeId) {
  const { data: favorites, isLoading } = useFavorites();

  const favoriteRecord = favorites?.find((fav) => fav.animeId === Number(animeId));

  return {
    isFavorite: Boolean(favoriteRecord),
    favoriteId: favoriteRecord?.id,
    isLoading,
  };
}
