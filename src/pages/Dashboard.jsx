import { StatCard, ProgressBar } from "../components/ui/DashboardPieces";
import { useFavorites } from "../hooks/queries/favourites/usefavourite";
import { useAllLibrary } from "../hooks/queries/library/useAllLibrary";
import { useAllRatings } from "../hooks/queries/rating/useAllRatings";


const STATUS_LABELS = { "Plan To Watch": "À voir", Watching: "En cours", Completed: "Terminé" };
const STATUS_COLORS = { "Plan To Watch": "bg-mist", Watching: "bg-gold", Completed: "bg-jade" };

export default function Dashboard() {
  const { data: favorites = [], isLoading: loadingFav } = useFavorites();
  const { data: library = [], isLoading: loadingLib } = useAllLibrary();
  const { data: ratings = [], isLoading: loadingRatings } = useAllRatings();

  if (loadingFav || loadingLib || loadingRatings) return <p>Chargement...</p>;

  const totalFavorites = favorites.length;
  const completed = library.filter((item) => item.status === "Completed").length;

  const avgRating = ratings.length
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
    : "—";

  const genreCount = {};
  favorites.forEach((f) =>
    f.snapshot.genres?.forEach((g) => (genreCount[g] = (genreCount[g] || 0) + 1))
  );
  const genreEntries = Object.entries(genreCount).sort((a, b) => b[1] - a[1]);
  const topGenre = genreEntries[0]?.[0] || "—";
  const maxGenreCount = Math.max(1, ...genreEntries.map(([, count]) => count));

  const episodesWatched = library
    .filter((item) => item.status === "Completed")
    .reduce((sum, item) => sum + (item.snapshot.episodes || 0), 0);

  const statusCount = { "Plan To Watch": 0, Watching: 0, Completed: 0 };
  library.forEach((item) => {
    if (statusCount[item.status] !== undefined) statusCount[item.status]++;
  });
  const maxStatusCount = Math.max(1, ...Object.values(statusCount));

  return (
    <section>
      <h1 className="font-display text-3xl mb-8 text-white">Tableau de bord</h1>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10 ">
        <StatCard label="Favoris" value={totalFavorites} colorClass="text-vermilion" />
        <StatCard label="Terminés" value={completed} colorClass="text-jade" />
        <StatCard label="Note moyenne" value={avgRating} colorClass="text-gold" />
        <StatCard label="Genre dominant" value={topGenre} colorClass="text-indigo-2" />
        <StatCard label="Épisodes vus" value={episodesWatched} colorClass="text-mist" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-white" >
        <div className="bg-panel border border-white/10 rounded-2xl p-6">
          <h3 className="font-display text-lg mb-5">Genres favoris</h3>
          <div className="flex flex-col gap-3">
            {genreEntries.length === 0 ? (
              <p className="text-sm text-mist">Ajoutez des favoris pour voir vos genres préférés.</p>
            ) : (
              genreEntries.map(([genre, count]) => (
                <ProgressBar key={genre} label={genre} count={count} max={maxGenreCount} colorClass="bg-vermilion" />
              ))
            )}
          </div>
        </div>

        <div className="bg-panel border border-white/10 rounded-2xl p-6">
          <h3 className="font-display text-lg mb-5">Répartition bibliothèque</h3>
          <div className="flex flex-col gap-3">
            {Object.entries(statusCount).map(([status, count]) => (
              <ProgressBar
                key={status}
                label={STATUS_LABELS[status]}
                count={count}
                max={maxStatusCount}
                colorClass={STATUS_COLORS[status]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}