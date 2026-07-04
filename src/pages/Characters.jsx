import { useDeferredValue, useMemo, useState } from "react";
import { CHARACTERS } from "../data/charactersData";
import CharacterCard from "../components/ui/CharacterCard";
import { EmptyState, SkeletonGrid } from "../components/ui/Feedback";
import { useCharactersList } from "../hooks/queries/characters/useCharacters";

export default function Characters() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const deferredQuery = useDeferredValue(query);

  const { data, isLoading, isError, error, isPlaceholderData } = useCharactersList({
    query: deferredQuery,
    page,
  });
  const characters = data?.data ?? [];
  const hasNextPage = data?.pagination?.has_next_page ?? false;
  console.log(data)

  return (
    <section>
      <h1 className="font-display text-3xl mb-6 text-white">Personnages</h1>
      <div className="relative max-w-md mb-8">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-mist"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Rechercher un personnage…"
          className="w-full bg-panel border border-white/10 focus:border-gold rounded-full pl-11 pr-4 py-2.5 text-sm placeholder:text-mist outline-none"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-5">
        {isLoading && <SkeletonGrid count={1} />}
        {characters.length === 0 ? (
          <EmptyState title="Aucun personnage trouvé" subtitle="Essayez un autre nom." />
        ) : (
          characters.map((c) => <CharacterCard key={c.id} character={c} />)
        )}
      </div>
      {characters.length > 0 && (
        <div className="flex items-center justify-center gap-3 mt-10 font-mono text-sm">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 border border-white/15 rounded-full disabled:opacity-30 text-white"
          >
            Précédent
          </button>
          <span className="text-mist">Page {page}</span>
          <button
            disabled={!hasNextPage}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border border-white/15 rounded-full disabled:opacity-30 text-white"
          >
            Suivant
          </button>
        </div>
      )}ﬂ
    </section>
  );
}
