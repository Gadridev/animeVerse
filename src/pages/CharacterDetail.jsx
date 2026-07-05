import { Link, useNavigate, useParams } from "react-router-dom";
import { useOneCharacter } from "../hooks/queries/characters/useCharacter";

export default function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {data,isLoading}=useOneCharacter(id)
  if(isLoading) return <p>loading ...</p>

    const character=data.data

  if (!character) {
    return <p className="text-mist">Ce personnage est introuvable.</p>;
  }

 

  return (
    <section className="max-w-3xl">
      <button
        onClick={() => navigate("/characters")}
        className="text-sm text-mist hover:text-paper mb-6 inline-flex items-center gap-2"
      >
        ← Retour aux personnages
      </button>
      <div className="grid md:grid-cols-3 gap-8 mx-5">
        <div
          className="h-100 mt-9  rounded-2xl flex items-center justify-center"
          
        >
           <img
          src={character.images?.webp.image_url}
          alt={character.name}
          className="w-full h-full object-cover"
        />
        </div>
        <div className="md:col-span-2">
          <p className="font-mono text-xs tracking-[0.25em] text-gold uppercase mb-2">{character.role}</p>
          <h1 className="font-display text-3xl mb-4 text-white">{character.name}</h1>
          <p className="text-mist leading-relaxed mb-6 text-sm">{character.about}</p>
          {anime && (
            <>
              <p className="text-xs font-mono text-mist uppercase tracking-wide mb-2">Apparaît dans</p>
              <Link
                to={`/anime/${anime.id}`}
                className="cursor-pointer inline-flex items-center gap-3 bg-panel border border-white/10 hover:border-gold rounded-xl px-4 py-3 transition"
              >
                <div
                  className="w-8 h-8 rounded-md"
                  style={{ background: `linear-gradient(155deg, ${anime.gradient[0]}, ${anime.gradient[1]})` }}
                />
                <span className="text-sm font-semibold">{anime.title}</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
