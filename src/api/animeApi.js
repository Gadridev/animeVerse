import apiClient from "./axiosClient";
import { JIKAN_ENDPOINTS } from "./endpoints";

export const fetchTopAnime = (params = {}) =>
  apiClient.get(JIKAN_ENDPOINTS.topAnime, { params });

export const fetchSeasonalAnime = (params = {}) =>
  apiClient.get(JIKAN_ENDPOINTS.seasonNow, { params });

export const fetchAnimeCatalogue = (params = {}) =>
  apiClient.get(JIKAN_ENDPOINTS.animeSearch, { params });

export const fetchAnimeById = (id) =>
  apiClient.get(JIKAN_ENDPOINTS.animeById(id));

export const fetchAnimeCharacters = (id) =>
  apiClient.get(JIKAN_ENDPOINTS.animeCharacters(id));

export const fetchAnimeRecommendations = (id) =>
  apiClient.get(JIKAN_ENDPOINTS.animeRecommendations(id));

export const fetchAnimeGenres = () =>
  apiClient.get(JIKAN_ENDPOINTS.animeGenres);
