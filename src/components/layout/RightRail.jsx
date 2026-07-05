import { Link, useLocation } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { useTopAnime } from "../../hooks/queries/useTopRatedAnime";
import { useFavorites } from "../../hooks/queries/favourites/usefavourite";

const STATUS_LABELS = {
  Completed: "Terminé",
  Watching: "En cours",
  "Plan To Watch": "À voir",
};

export default function RightRail() {
  const location = useLocation();
  const { favorites, library } = useLibrary();
  const { data, isLoading } = useTopAnime({ limit: 10 });
  const { data: favouriteData } = useFavorites()
  console.log(favouriteData)
  if (isLoading) return <p>isloading...</p>

  const popular = [...data.data].sort((a, b) => b.score - a.score).slice(0, 4);

  const visible = location.pathname === "/" || location.pathname === "/anime";
  if (!visible) return null;

  // const watchlist = [...favorites]
  //   .map((id) => ANIME.find((a) => a.id === id))
  //   .filter(Boolean)
  //   .slice(0, 4);

  return (
    <aside className="hidden xl:flex flex-col w-80 shrink-0 border-l border-white/5 px-6 py-8 overflow-y-auto">
      <p className="font-mono text-[10px] tracking-[0.2em] text-mist/70 uppercase mb-4">Anime populaires</p>
      <div className="flex flex-col gap-3 mb-8">
        {popular.map((anime) => (
          <RailRow key={anime.id} anime={anime} subtitle={anime.type === "Movie" ? "Film" : `${anime.episodes} ép`} />
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[10px] tracking-[0.2em] text-mist/70 uppercase">Ma watchlist</p>
        <Link to="/favorites" className="text-[10px] font-mono text-gold">
          Voir tout
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {/* {watchlist.length === 0 ? (
          <p className="text-xs text-mist">Aucun favori pour l'instant.</p>
        ) : (
          favouriteData.map((anime) => (
            <RailRow key={anime.id} anime={anime.snapshot} subtitle={STATUS_LABELS[library.get(anime.id)] || "Non suivi"} />
          ))
        )} */}
      </div>
    </aside>
  );
}

function RailRow({ anime, subtitle }) {

  return (
    <Link to={`/anime/${anime.id}`} className="flex items-center gap-3 cursor-pointer group">
      <div className="w-11 h-11 rounded-lg shrink-0 opacity-90" style={{ backgroundImage: `url(${anime.images?.jpg.large_image_url || anime.image})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} />
      <div className="min-w-0">
        <p className="text-sm font-medium truncate group-hover:text-gold transition text-white">{anime.title}</p>
        <p className="text-[11px] text-mist font-mono">{subtitle}</p>
      </div>
    </Link>
  );
}
