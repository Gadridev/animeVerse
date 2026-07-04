export const JIKAN_ENDPOINTS = {

  topAnime: "/top/anime",
  animeSearch: "/anime",
  animeById: (id) => `/anime/${id}`,
  animeCharacters: (id) => `/anime/${id}/characters`,
  animeRecommendations: (id) => `/anime/${id}/recommendations`,
  animeGenres: "/genres/anime",
   seasonNow: "/seasons/now",
    charactersList: "/characters",

  topCharacters: "/top/characters",
  characterById: (id) => `/characters/${id}`,
  characterSearch: "/characters",
};
