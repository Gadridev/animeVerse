import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";

function getPageTitle(pathname) {
  if (pathname === "/") return "ACCUEIL";
  if (pathname.startsWith("/anime/") && pathname.endsWith("/characters")) return "PERSONNAGES";
  if (pathname.startsWith("/anime/")) return "DÉTAIL ANIME";
  if (pathname.startsWith("/anime")) return "CATALOGUE ANIME";
  if (pathname.startsWith("/characters/")) return "PROFIL";
  if (pathname.startsWith("/characters")) return "PERSONNAGES";
  if (pathname.startsWith("/favorites")) return "FAVORIS";
  if (pathname.startsWith("/ratings")) return "MES NOTES";
  if (pathname.startsWith("/library")) return "MA BIBLIOTHÈQUE";
  if (pathname.startsWith("/dashboard")) return "TABLEAU DE BORD";
  return "";
}

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    if (e.key !== "Enter") return;
    navigate(`/anime?q=${encodeURIComponent(search)}`);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 px-5 md:px-9 py-5 border-b border-white/5 text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            className="lg:hidden text-paper shrink-0"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-vermilion/15 border border-vermilion/30 flex items-center justify-center text-vermilion font-display text-xs">
              鳥
            </div>
            <span className="font-display text-sm tracking-wide">ANIVERSE</span>
          </div>
          <h1 className="hidden md:block font-display text-xl tracking-wide text-mist ml-2">
            {getPageTitle(location.pathname)}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-panel border border-white/10 rounded-full px-4 py-2 w-56 xl:w-72">
            <svg className="text-mist shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchSubmit}
              type="text"
              placeholder="Rechercher un anime…"
              className="bg-transparent text-sm outline-none placeholder:text-mist flex-1 min-w-0"
            />
          </div>
          <button
            aria-label="Notifications"
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-mist hover:text-paper transition shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M13.7 21a2 2 0 01-3.4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="w-9 h-9 rounded-full shrink-0" style={{ background: "linear-gradient(155deg,#E8432E,#7A4A8A)" }} />
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
