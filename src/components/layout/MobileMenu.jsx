import { NavLink } from "react-router-dom";
import { NAV_SECTIONS } from "./Sidebar";

export default function MobileMenu({ open, onClose }) {
  if (!open) return null;

  const allItems = NAV_SECTIONS.flatMap((section) => section.items);

  return (
    <div className="lg:hidden fixed inset-0 z-50 text-white bg-ink/95 backdrop-blur px-6 py-8 overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <span className="font-display text-lg">ANIVERSE</span>
        <button onClick={onClose} aria-label="Fermer" className="text-mist">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <nav className="flex flex-col gap-1 text-base">
        {allItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            onClick={onClose}
            className="text-left py-3 border-b border-white/5"
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
