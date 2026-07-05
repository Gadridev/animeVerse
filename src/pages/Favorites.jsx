import AnimeCard from "../components/ui/AnimeCard";
import { EmptyState } from "../components/ui/Feedback";
import { useFavorites } from "../hooks/queries/favourites/usefavourite";

export default function Favorites() {
  const { data, isLoading } = useFavorites()
  if(isLoading) return <p>loading...</p>

console.log(data)

  return (
    <section>
      <h1 className="font-display text-3xl mb-7 text-white">Mes Favoris</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 min-h-[200px]">
        {data.length === 0 ? (
          <EmptyState
            title="Aucun favori pour le moment"
            subtitle="Cliquez sur ♡ sur une fiche anime pour la retrouver ici."
          />
        ) : (
          data.map((anime) => <AnimeCard key={anime.id} anime={anime.snapshot} idfavourit={anime.animeId}/>)
        )}
      </div>
    </section>
  );
}
