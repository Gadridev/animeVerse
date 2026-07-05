import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AnimeCard from "../components/ui/AnimeCard";
import { fetchTopAnime } from "../api/animeApi";
import { useTopAnime } from "../hooks/queries/useTopRatedAnime";
import { useSeasonalAnime } from "../hooks/queries/useSeasonalAnime";
import Spinner from "../components/ui/Spinner";

export default function Home() {
  const [typeTab, setTypeTab] = useState("TV");
  const [heroIndex, setHeroIndex] = useState(0);
  const { data, isLoading } = useTopAnime({ limit: 10 });
  const { data:dataSeason, isLoading:isSeason, isError, error } = useSeasonalAnime(6);

  if (isSeason) return <Spinner size="lg" label="Chargement des animes..." />;
  if (isError) return <p>Error: {error.message}</p>;
  if(isLoading){
    return "loading"
  }

  const heroSlides = [...data.data].sort((a, b) => b.score - a.score).slice(0, 4);
  console.log(heroSlides)

  return (
    <section>
      <div className="flex items-center gap-2 mb-5 text-sm">
        <TypeTab label="Séries" active={typeTab === "TV"} onClick={() => setTypeTab("TV")} />
        <TypeTab label="Films" active={typeTab === "Movie"} onClick={() => setTypeTab("Movie")} />
      </div>

      <HeroCarousel slides={heroSlides} activeIndex={heroIndex} onDotClick={setHeroIndex} />

      <RowHeader title="Top Anime" seeAllTo="/anime" />
      <AnimeRow items={data.data} emptyMessage="Aucun titre pour ce filtre." />

      <RowHeader title="Derniers Ajouts" />
      <AnimeRow items={dataSeason.data} />
    </section>
  );
}

function TypeTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`font-semibold px-1 pb-1 border-b-2 transition ${
        active ? "border-vermilion text-paper" : "border-transparent text-mist hover:text-paper"
      }`}
    >
      {label}
    </button>
  );
}

function RowHeader({ title, seeAllTo }) {
  return (
    <div className="flex items-end justify-between mt-10 mb-4">
      <h2 className="font-display text-2xl text-white">{title}</h2>
      {seeAllTo && (
        <Link to={seeAllTo} className="text-xs font-mono text-mist hover:text-gold transition">
          Tout voir →
        </Link>
      )}
    </div>
  );
}

function AnimeRow({ items, emptyMessage }) {
  if (items.length === 0) {
    return <p className="text-sm text-mist">{emptyMessage}</p>;
  }

  return (
    <div className="row-scroll flex gap-5 overflow-x-auto pb-3">
      {items.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} widthClass="w-36 shrink-0" />
      ))}
    </div>
  );
}

function HeroCarousel({ slides, activeIndex, onDotClick }) {
  const anime = slides[activeIndex % slides.length];
  console.log(anime)

  return (

    <>
      <div className="relative rounded-2xl overflow-hidden h-70 md:h-95">
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, #3E8E7E66 0%, #14141Ccc 85%)` }} />
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: `url(${anime.images?.jpg.large_image_url})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover" }}
        />
        <div className="relative h-full flex flex-col justify-center px-7 md:px-12 max-w-lg">
          <p className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase mb-3">{anime.jp}</p>
          <h2 className="font-display text-3xl md:text-5xl leading-[0.95] mb-4 text-white">{anime.title}</h2>
          <p className="text-mist text-sm mb-5 hidden sm:block">{anime.synopsis.slice(0, 110)}…</p>
          <div className="flex items-center gap-3">
            <Link
              to={`/anime/${anime.mal_id}`}
              aria-label={`Voir la fiche de ${anime.title}`}
              className="w-11 h-11 rounded-full bg-paper/10 border border-white/20 flex items-center justify-center hover:bg-vermilion hover:border-vermilion transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </Link>
            <span className="font-mono text-xs text-mist">
              {anime.type === "Movie" ? "Film" : `${anime.episodes} épisodes`} · ★ {anime.score.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            aria-label={`Aller au titre en avant ${i + 1}`}
            className={`dot ${i === activeIndex % slides.length ? "active" : ""}`}
          />
        ))}
      </div>
    </>
  );
}
