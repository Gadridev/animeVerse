import { createContext, useContext, useMemo, useState } from "react";

const LibraryContext = createContext(null);

const INITIAL_FAVORITES = [1, 4, 6];
const INITIAL_LIBRARY = [
  [1, "Completed"],
  [3, "Watching"],
  [5, "Plan To Watch"],
  [6, "Completed"],
  [9, "Watching"],
];
const INITIAL_RATINGS = [
  [1, { score: 9, note: "Une claque visuelle, la saison finale change tout." }],
  [4, { score: 10, note: "Le meilleur rythme narratif vu depuis longtemps." }],
];

export function LibraryProvider({ children }) {
  const [favorites, setFavorites] = useState(() => new Set(INITIAL_FAVORITES));
  const [library, setLibrary] = useState(() => new Map(INITIAL_LIBRARY));
  const [ratings, setRatings] = useState(() => new Map(INITIAL_RATINGS));

  const toggleFavorite = (animeId) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(animeId) ? next.delete(animeId) : next.add(animeId);
      return next;
    });
  };

  const setLibraryStatus = (animeId, status) => {
    setLibrary((prev) => {
      const next = new Map(prev);
      status ? next.set(animeId, status) : next.delete(animeId);
      return next;
    });
  };

  const removeFromLibrary = (animeId) => setLibraryStatus(animeId, null);

  const saveRating = (animeId, score, note) => {
    setRatings((prev) => new Map(prev).set(animeId, { score, note }));
  };

  const deleteRating = (animeId) => {
    setRatings((prev) => {
      const next = new Map(prev);
      next.delete(animeId);
      return next;
    });
  };

  const value = useMemo(
    () => ({
      favorites,
      library,
      ratings,
      toggleFavorite,
      setLibraryStatus,
      removeFromLibrary,
      saveRating,
      deleteRating,
    }),
    [favorites, library, ratings]
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used inside a <LibraryProvider>");
  return ctx;
}
