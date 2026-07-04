import { Link } from "react-router-dom";
import Poster from "./Poster";
import { useLibrary } from "../../context/LibraryContext";
import { useAddFavorite } from "../../hooks/queries/favourites/useAddFavourite";
import { useIsFavorite } from "../../hooks/queries/favourites/checkingFavourite";
import { useRemoveFavorite } from "../../hooks/queries/favourites/useRemoveFavorite";

export default function AnimeCard({ anime, widthClass = "", idfavourit = null }) {
  const { isFavorite,favoriteId } = useIsFavorite(anime.mal_id || idfavourit)
  const addFavoriteMutation = useAddFavorite();
  const removeFavoriteMutation = useRemoveFavorite();
  console.log(favoriteId,anime.mal_id)

  const handleAddFavorite = () => {
    if (isFavorite) {
      removeFavoriteMutation.mutate(favoriteId);
    } else {
      addFavoriteMutation.mutate({
        animeId: anime.mal_id,
        snapshot: {
          title: anime.title,
          image: anime.images?.webp?.large_image_url,
          score: anime.score,
          year: anime.year,
          episodes: anime.episodes
        },
        addedAt: new Date().toISOString(),
      });
    }
  };
  return (
    <div className={`card-hover group ${widthClass}`}>
      <Link to={`/anime/${anime.mal_id || idfavourit}`}>
        <Poster anime={anime} />
      </Link>
      <div className="pt-2.5 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link to={`/anime/${anime.id}`} className="font-semibold text-sm text-white truncate block hover:text-gold transition">
            {anime.title}
          </Link>
          <p className="text-[11px] text-mist font-mono mt-0.5">
            {anime.episodes} ép · {anime.year}
          </p>
        </div>
        <button
          onClick={handleAddFavorite}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          aria-pressed={isFavorite}
          className={`shrink-0 mt-0.5 text-base transition ${isFavorite ? "text-vermilion" : "text-mist/50 hover:text-vermilion"
            }`}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}
