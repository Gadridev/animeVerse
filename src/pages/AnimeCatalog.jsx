import { useState, useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";
import AnimeCard from "../components/ui/AnimeCard";
import { EmptyState, ErrorState, SkeletonGrid } from "../components/ui/Feedback";
import { useAnimeGenres } from "../hooks/queries/catalogue/useAnimeGenres";
import { useAnimeCatalogue } from "../hooks/queries/catalogue/useAnimeCatalogue";

export default function AnimeCatalog() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [genre, setGenre] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);

  const deferredQuery = useDeferredValue(query);
  const { data: genresData } = useAnimeGenres();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isPlaceholderData,
  } = useAnimeCatalogue({ query: deferredQuery, genre, type, page });

  const results = data?.data ?? [];
  const hasNextPage = data?.pagination?.has_next_page ?? false;
  const lastVisiblePage = data?.pagination?.last_visible_page ?? 1;

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-7 text-white">
        <h1 className="font-display text-3xl">Catalogue Anime</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-7">
        <div className="relative flex-1">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            type="text"
            placeholder="Rechercher un anime…"
            className="w-full bg-panel border border-white/10 focus:border-gold rounded-full pl-11 pr-4 py-2.5 text-sm placeholder:text-mist outline-none transition"
          />
        </div>

        <select
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            setPage(1);
          }}
          className="bg-panel border text-white border-white/10 focus:border-gold rounded-full px-4 py-2.5 text-sm outline-none"
        >
          <option value="">Tous les genres</option>
          {genresData?.data?.map((g) => (
            <option key={g.mal_id} value={g.mal_id}>
              {g.name}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
          className="bg-panel border text-white border-white/10 focus:border-gold rounded-full px-5 py-2.5 text-sm outline-none"
        >
          <option value="">Tous les types</option>
          <option value="tv">Série TV</option>
          <option value="movie">Film</option>
        </select>
      </div>

      <div
        className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 min-h-55 transition-opacity ${
          isPlaceholderData ? "opacity-50" : "opacity-100"
        }`}
      >
        {isLoading && <SkeletonGrid count={10} />}
        {isError && <ErrorState message={error.message} onRetry={refetch} />}
        {!isLoading &&
          !isError &&
          (results.length === 0 ? (
            <EmptyState title="Aucun résultat" subtitle="Essayez un autre mot-clé ou modifiez vos filtres." />
          ) : (
            results.map((anime) => <AnimeCard key={anime.mal_id} anime={anime} />)
          ))}
      </div>

      {!isLoading && !isError && results.length > 0 && (
        <div className="flex items-center justify-center gap-3 mt-10 font-mono text-sm">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 border border-white/15 rounded-full disabled:opacity-30"
          >
            previous
          </button>
          <span className="text-mist">
            page {page} / {lastVisiblePage}
          </span>
          <button
            disabled={!hasNextPage}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border border-white/15 rounded-full disabled:opacity-30"
          >
            next
          </button>
        </div>
      )}
    </section>
  );
}