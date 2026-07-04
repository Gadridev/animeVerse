import { Link } from "react-router-dom";
export default function CharacterCard({ character,role }) {
  console.log("testing", character.mal_id)
  


  return (
    <Link to={`/characters/${character.mal_id }`} className="card-hover block cursor-pointer text-white">
      <div
        className="rounded-xl relative overflow-hidden flex items-center justify-center opacity-55"
       
      >
        <img
          src={character.images?.webp.image_url}
          alt={character.name}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="pt-2 text-sm font-semibold truncate">{character.name}</p>
      <p className="text-[11px] text-mist font-mono">{role}</p>
    </Link>
  );
}
