import { Link } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";
import { EmptyState } from "../components/ui/Feedback";
import { useAllRatings } from "../hooks/queries/rating/useAllRatings";
import { useRemoveLibraryEntry } from "../hooks/queries/library/useRemoveLibrary";
import { useRemoveRatings } from "../hooks/queries/rating/useDeleteRatings";

export default function Ratings() {
  const { ratings, deleteRating } = useLibrary();
  const {data,isLoading}=useAllRatings()
  const removeRatings=useRemoveRatings()
  if(isLoading) return <p>loading ....</p>

  console.log(data)

  

  const entries = [...ratings.entries()];
  console.log(entries)


  return (
    <section className="max-w-3xl text-white">
      <h1 className="font-display text-3xl mb-7">Mes Notes</h1>
      <div className="flex flex-col gap-4 min-h-[200px]">
        {data.length === 0 ? (
          <EmptyState
            title="Aucune note enregistrée"
            subtitle="Notez un anime depuis sa fiche pour le voir apparaître ici."
          />
        ) : (
          data.map((animes) => {
            const anime=animes.snapshot
            return (
              <div key={anime.animeId} className="bg-panel border border-white/10 rounded-2xl p-5 flex gap-4 text-white">
                 <div
                  className="w-30 h-30 rounded-lg shrink-0 opacity-60"
                  style={{ background: `url(${anime.image})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}
                /> 
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <Link to={`/anime/${animes.animeId}`} className="font-semibold truncate hover:text-gold transition">
                      {anime.title}
                    </Link>
                    <span className="stamp w-8 h-8 text-[11px] text-gold shrink-0">{animes.rating}</span>
                  </div>
                  <p className="text-sm text-mist mt-1">{animes.note || "—"}</p>
                  <div className="flex gap-3 mt-3 text-xs font-mono">
                    <Link to={`/anime/${animes.animeId}`} className="text-jade hover:underline">
                      Modifier
                    </Link>
                    <button onClick={()=>removeRatings.mutate(animes.id)} className="text-vermilion hover:underline">
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
