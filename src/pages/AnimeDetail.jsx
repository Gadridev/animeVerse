import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAnimeById } from "../data/animeData";
import { useLibrary } from "../context/LibraryContext";
import { useAnimeDetails } from "../hooks/queries/detailsanime/useAnimeDetails";
import { useIsFavorite } from "../hooks/queries/favourites/checkingFavourite";
import { useAddFavorite } from "../hooks/queries/favourites/useAddFavourite";
import { useRemoveFavorite } from "../hooks/queries/favourites/useRemoveFavorite";
import { useLibraryStatus } from "../hooks/queries/library/useLibraryStatus";
import { useSaveLibraryStatus } from "../hooks/queries/library/useSaveLibraryStatus";
import { useAnimeRating } from "../hooks/queries/rating/useRatings";
import { useSaveRating } from "../hooks/queries/rating/useSaveRating";

export default function AnimeDetail() {
  const [rating, setRating] = useState(5);
  const [note, setNote] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const { isFavorite, favoriteId } = useIsFavorite(id);
  const addFavoriteMutation = useAddFavorite();

  const { data: existingRating } = useAnimeRating(Number(id));
  console.log(existingRating)
  const saveRatingMutation = useSaveRating(id);
  const removeFavoriteMutation = useRemoveFavorite();
  const { data, isLoading, isError, error } = useAnimeDetails(id);
  const { data: dataRating, isLoading: isRating } = useAnimeRating(id)

  const { data: libraryEntry } = useLibraryStatus(id);
  console.log(libraryEntry)
  const saveLibraryMutation = useSaveLibraryStatus(id);
  useEffect(() => {
    if (existingRating) {
      setRating(existingRating.rating);
      setNote(existingRating.note ?? "");
    }
  }, [existingRating]);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-white">Error: {error.message}</p>;
  const anime = data.data;
  const snapshot = {
    title: anime.title,
    image: anime.images?.webp?.large_image_url,
    score: anime.score,
    year: anime.year,
    episodes: anime.episodes
  }
  console.log(libraryEntry)
  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteMutation.mutate(favoriteId);
    } else {
      addFavoriteMutation.mutate({
        animeId: Number(id),
        snapshot,
        addedAt: new Date().toISOString(),
      });
    }
  };
  const handleStatusChange = (e) => {
    saveLibraryMutation.mutate({
      existingId: libraryEntry?.id,
      status: e.target.value,
      snapshot,
    });
  };
  const handleSaveRating = () => {
    saveRatingMutation.mutate({
      existingId: existingRating?.id,
      rating,
      note,
      snapshot,
    });
  }

  return (
    <section>
      <div className="relative h-100 md:h-100 rounded-2xl overflow-hidden mb-8 bg-panel2 text-white">
        <img src={anime.images?.webp.large_image_url} alt="Steins;Gate" className="absolute inset-0 w-full h-full object-cover"  />

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent"></div>
        <div className="relative h-full flex flex-col justify-end p-7 md:p-10">
          <button onclick="navigate('anime')" className="text-sm text-mist hover:text-paper mb-4 inline-flex items-center gap-2 w-fit">← Retour au catalogue</button>
          <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-2">シュタインズ・ゲート</p>
          <h1 className="font-display text-3xl md:text-5xl max-w-2xl leading-[0.95]">Steins;Gate</h1>
          <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-mono text-mist">
            <span className="stamp w-9 h-9 text-gold text-[10px] bg-ink/50">9.0</span>
            <span>2011</span><span>·</span><span>24 épisodes</span><span>·</span><span>White Fox</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 text-white">
        <div className="lg:col-span-2">
          <h2 className="font-display text-xl mb-3">Synopsis</h2>
          <p className="text-mist leading-relaxed mb-6 text-sm">{anime.synopsis}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {anime.genres.map((g) => (
              <span key={g.mal_id} className="text-xs font-mono border border-white/15 rounded-full px-3 py-1.5 text-mist">
                {g.name}
              </span>
            ))}
          </div>
          <div className="aspect-video rounded-xl border border-white/10 bg-panel flex items-center justify-center text-mist text-sm gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
            </svg>
            <iframe
              src={anime.trailer.embed_url}
              title={`${anime.title} trailer`}
              className="w-full aspect-video rounded-lg"
              allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

          </div>
          <Link
            to={`/anime/${anime.mal_id}/characters`}
            className="mt-7 inline-flex items-center gap-2 border border-white/20 hover:border-gold hover:text-gold px-5 py-2.5 rounded-full text-sm font-medium transition"
          >
            Voir les personnages →
          </Link>
        </div>

        <div className="bg-panel border border-white/10 rounded-2xl p-6 h-fit">
          <button
            onClick={handleToggleFavorite}
            className={`w-full mb-4 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${isFavorite ? "bg-vermilion text-paper" : "border border-white/20 hover:border-vermilion"
              }`}
          >
            {isFavorite ? "♥ Dans les favoris" : "♡ Ajouter aux favoris"}
          </button>

          <label className="text-xs font-mono text-mist uppercase tracking-wide">Statut bibliothèque</label>
          <select
            value={libraryEntry?.status ?? "Non ajouté"}
            onChange={handleStatusChange}
            className="w-full mt-2 mb-5 bg-panel-2 border border-white/10 focus:border-jade rounded-lg px-3 py-2.5 text-sm outline-none"
          >
            <option value="">Non ajouté</option>
            <option value="Plan To Watch">À voir</option>
            <option value="Watching">En cours</option>
            <option value="Completed">Terminé</option>
          </select>

          <label className="text-xs font-mono text-mist uppercase tracking-wide">Ma note (1–10)</label>
          <div className="flex items-center gap-3 mt-2 mb-4">
            <input
              type="range"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="rate flex-1"
            />
            <span className="font-mono text-gold w-6 text-center"> {rating?.toFixed(1)}</span>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Une note personnelle sur cet anime..."
            rows={3}
            className="w-full bg-panel-2 border border-white/10 focus:border-gold rounded-lg px-3 py-2.5 text-sm outline-none placeholder:text-mist/60 mb-3"
          />
          <button
            onClick={handleSaveRating}
            disabled={saveRatingMutation.isPending}
            className="w-full bg-gold text-ink font-semibold rounded-full px-5 py-2.5 text-sm hover:bg-gold/90 transition"
          >
            {saveRatingMutation.isPending ? "Enregistrement..." : "Enregistrer la note"}
          </button>
        </div>
      </div>
    </section>
  );
}
