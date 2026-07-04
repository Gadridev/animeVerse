import { useState } from "react";
import { Link } from "react-router-dom";
import Poster from "../components/ui/Poster";
import { EmptyState } from "../components/ui/Feedback";
import { useAllLibrary } from "../hooks/queries/library/useAllLibrary";
import { useRemoveLibraryEntry } from "../hooks/queries/library/useRemoveLibrary";
import { useSaveLibraryStatus } from "../hooks/queries/library/useSaveLibraryStatus";

const STATUS_FILTERS = [
  { value: "", label: "Tous" },
  { value: "Plan To Watch", label: "À voir" },
  { value: "Watching", label: "En cours" },
  { value: "Completed", label: "Terminé" },
];

const STATUS_OPTIONS = [
  { value: "Plan To Watch", label: "À voir" },
  { value: "Watching", label: "En cours" },
  { value: "Completed", label: "Terminé" },
];

export default function Library() {
  const [filter, setFilter] = useState("");
  const { data, isLoading } = useAllLibrary();
  const removeLibrary = useRemoveLibraryEntry();
  const saveLibraryMutation = useSaveLibraryStatus(); // ✅ من غير animeId هنا

  if (isLoading) return <p className="text-white">Chargement...</p>;

  const handleStatusChange = (anime, newStatus) => {
     console.log("handleStatusChange fired", { anime, newStatus });
    saveLibraryMutation.mutate({
      animeId: anime.animeId,
      existingId: anime.id,
      status: newStatus,
      snapshot: anime.snapshot,
    });
  };

  let entries = [...data];
  if (filter) entries = entries.filter((anime) => anime.status === filter);

  return (
    <section>
      <h1 className="font-display text-3xl mb-6 text-white">Ma Bibliothèque</h1>

      <div className="flex flex-wrap gap-2 mb-7">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`text-xs font-mono px-4 py-2 rounded-full border transition ${
              filter === f.value ? "bg-jade border-jade text-ink" : "border-white/15 text-mist hover:border-white/40"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 min-h-[200px] text-white">
        {entries.length === 0 ? (
          <EmptyState title="Bibliothèque vide" subtitle="Ajoutez un anime depuis sa fiche pour suivre votre visionnage." />
        ) : (
          entries.map((anime) => (
            <div key={anime.id} className="card-hover relative">
              <Link to={`/anime/${anime.animeId}`} className="relative block cursor-pointer">
                <Poster anime={anime.snapshot} />
                {anime.status === "Completed" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="stamp w-16 h-16 text-jade text-[9px] bg-ink/30">Terminé</span>
                  </div>
                )}
              </Link>
              <p className="pt-2.5 text-sm font-semibold truncate">{anime.snapshot.title}</p>
              <div className="flex items-center justify-between mt-2">
                <select
                  value={anime.status}
                  onChange={(e) => handleStatusChange(anime, e.target.value)}
                  className="bg-panel-2 border border-white/10 rounded-full px-2.5 py-1 text-[11px] font-mono outline-none"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeLibrary.mutate(anime.id)}
                  className="text-[11px] text-mist hover:text-vermilion transition"
                >
                  Retirer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}