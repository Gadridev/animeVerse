import { NavLink } from "react-router-dom";

const NAV_SECTIONS = [
  {
    label: "Menu",
    items: [
      { to: "/", label: "Accueil", icon: <HomeIcon /> },
      { to: "/anime", label: "Anime", icon: <TvIcon /> },
      { to: "/characters", label: "Personnages", icon: <UsersIcon /> },
    ],
  },
  {
    label: "Bibliothèque",
    items: [
      { to: "/favorites", label: "Favoris", icon: <HeartIcon /> },
      { to: "/ratings", label: "Mes Notes", icon: <StarIcon /> },
      { to: "/library", label: "Ma Bibliothèque", icon: <BookIcon /> },
    ],
  },
  {
    label: "Général",
    items: [{ to: "/dashboard", label: "Tableau de bord", icon: <GridIcon /> }],
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-white/5 px-7 py-8 text-white">
      <div className="flex items-center gap-2.5 mb-10">
        <div className="w-9 h-9 rounded-full bg-vermilion/15 border border-vermilion/30 flex items-center justify-center text-vermilion font-display text-sm">
          鳥
        </div>
        <span className="font-display text-lg tracking-wide">ANIVERSE</span>
      </div>

      {NAV_SECTIONS.map((section) => (
        <div key={section.label} className="mb-8 last:mb-0">
          <p className="font-mono text-[10px] tracking-[0.2em] text-mist/70 uppercase mb-3">{section.label}</p>
          <nav className="flex flex-col gap-1 text-sm">
            {section.items.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </nav>
        </div>
      ))}

      <div className="mt-auto pt-8">
        <div className="bg-panel border border-white/10 rounded-xl p-4">
          <p className="text-xs text-mist leading-relaxed">
            Projet AniVerse — connecté à <span className="text-gold">Jikan API</span> +{" "}
            <span className="text-jade">JSON Server</span> (maquette).
          </p>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
          isActive ? "text-paper bg-panel-2 before:absolute before:-left-6 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-[22px] before:bg-vermilion before:rounded" : "text-mist hover:text-paper"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

function HomeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M3 11l9-8 9 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v10h14V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TvIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 9h18M8 4v5M16 4v5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17.5" cy="9" r="2.4" stroke="currentColor" strokeWidth="2" />
      <path d="M14.8 14.6c2.6.3 4.7 2.2 4.7 5.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 20s-7-4.4-9.5-8.9C.8 7.6 2.7 4 6.3 4c2 0 3.6 1.1 4.7 2.8C12.1 5.1 13.7 4 15.7 4c3.6 0 5.5 3.6 3.8 7.1C19 15.6 12 20 12 20z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l2.7 5.9 6.3.7-4.7 4.4 1.3 6.3L12 17.2l-5.6 3.1 1.3-6.3L3 9.6l6.3-.7L12 3z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M6 3h12v18l-6-3.5L6 21V3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export { NAV_SECTIONS };
