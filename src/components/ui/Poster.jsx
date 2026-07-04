export default function Poster({ anime, heightClass = "h-40" }) {

  return (
    <div className={`relative ${heightClass} rounded-xl overflow-hidden bg-panel-2`}>
      <img
        src={anime.images?.jpg.image_url || anime.image}
        alt={anime.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0" style={{ "backgroundImage": "linear-gradient(160deg, #3E8E7E66 0%, #14141Ccc 85%)" }}></div>
      <div
        className="absolute inset-0 opacity-25"
        style={{ backgroundImage: "radial-gradient(circle at 30% 20%, #ffffff33, transparent 55%)" }}
      />
      <span className="jp-vert absolute left-2.5 top-2.5 bottom-9 font-mono text-[9px] text-white/50 overflow-hidden">
        {anime.jp}
      </span>

      <div className="ribbon bg-ink/85 text-gold border-t border-b border-gold/30">
        ★ {anime.score ?? "N/A"}
      </div>
    </div>
  );
}
