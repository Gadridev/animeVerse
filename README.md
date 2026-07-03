# AniVerse — React + Tailwind

A clean React conversion of the AniVerse UI mockup, built with Vite,
React Router, and Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev
```

## Structure

```
src/
  api/                   Jikan API layer (axios + interceptors)
    axiosClient.js       Configured axios instance:
                            - request interceptor throttles calls to stay
                              under Jikan's ~3 req/s rate limit
                            - response interceptor unwraps Jikan's
                              { data, pagination } body and normalizes
                              errors to { status, message, original }
    endpoints.js         Every Jikan path used by the app, in one place
    animeApi.js          fetchTopAnime, searchAnime, fetchAnimeById,
                          fetchAnimeCharacters, fetchAnimeRecommendations,
                          fetchAnimeGenres
    characterApi.js      fetchTopCharacters, fetchCharacterById, searchCharacters
    index.js             Barrel export: import { fetchTopAnime } from "../api"

  data/                  Static demo data (used by the UI right now — swap
                          for the api/ calls above whenever you're ready)
    animeData.js         14 anime + helpers (getAnimeById, ALL_GENRES)
    charactersData.js    12 characters + helpers

  context/
    LibraryContext.jsx   Plain React state for favorites / library / ratings.
                          Shaped like a Redux slice on purpose, so it's a
                          straight swap for Redux Toolkit whenever you add
                          your own logic.

  components/
    layout/              App chrome: Sidebar, Topbar, MobileMenu, RightRail, Layout
    ui/                  Reusable pieces: Poster, AnimeCard, CharacterCard,
                          EmptyState/ErrorState/SkeletonGrid, StatCard, ProgressBar

  pages/                 One file per route (Home, AnimeCatalog, AnimeDetail,
                          AnimeCharacters, Characters, CharacterDetail,
                          Favorites, Ratings, Library, Dashboard)

  App.jsx                Routes
  main.jsx               Entry point
  index.css              Tailwind import + design tokens (colors/fonts) + the
                          few bits of custom CSS Tailwind utilities can't express
                          (ribbon, stamp, jp-vert, skeleton shimmer, etc.)
```

## Using the API layer

The `src/api/` folder is ready to call Jikan but isn't wired into any page yet —
the UI still renders from `src/data/`. To use it, e.g. in a page or a hook:

```js
import { fetchTopAnime, fetchAnimeCharacters } from "../api";

const { data, pagination } = await fetchTopAnime({ limit: 12 });
const { data: cast } = await fetchAnimeCharacters(20605); // Frieren's MAL id
```

Copy `.env.example` to `.env` if you ever want to point at a different base URL
(e.g. a self-hosted Jikan instance); otherwise it defaults to the public API.

## Notes

- **Posters use placeholder photos** (`picsum.photos`, seeded per anime id) instead
  of real anime cover art, since real poster art is copyrighted. Swap `poster` in
  `animeData.js` for real URLs (e.g. from the Jikan API) whenever you're ready.
- **State is intentionally simple.** `LibraryContext` is just `useState` — no Redux,
  no persistence, no API calls. It's there so buttons like the favorite heart or
  "save rating" have something to do in the demo. You mentioned you'll handle the
  real business logic yourself, so this is deliberately minimal and easy to replace.
- **Design tokens** (colors, fonts) live in `src/index.css` under `@theme`, which is
  how Tailwind v4 does theming — no separate `tailwind.config.js` needed. Classes
  like `bg-ink`, `text-vermilion`, `font-display` all come from there.
