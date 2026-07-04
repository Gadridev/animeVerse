import { Link, useParams } from "react-router-dom";
import { getAnimeById } from "../data/animeData";
import { getCharactersByAnimeId } from "../data/charactersData";
import CharacterCard from "../components/ui/CharacterCard";
import { EmptyState } from "../components/ui/Feedback";
import { useAnimeCharacters } from "../hooks/queries/characters/useAnimeCharacter";

export default function AnimeCharacters() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useAnimeCharacters(id);
  
  if (isLoading) return <p className="text-white">Chargement...</p>;
  if (isError) return <p className="text-white">Erreur: {error.message}</p>;
  console.log(data.data)
  const cast = data.data;

 

  return (
    <section>
      <Link to={`/anime/${id}`} className="text-sm text-mist hover:text-paper mb-6 inline-flex items-center gap-2">
        ← Retour à l'anime
      </Link>
      <h1 className="font-display text-3xl mb-8">{cast.title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-5">
        {cast.length === 0 ? (
          <EmptyState title="Aucun personnage listé" subtitle="Cette fiche n'a pas encore été renseignée." />
        ) : (
          cast.map((c) => <CharacterCard key={c.id} character={c.character} role={c.role} />)
        )}
      </div>
    </section>
  );
}
