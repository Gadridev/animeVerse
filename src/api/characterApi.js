import apiClient from "./axiosClient";
import { JIKAN_ENDPOINTS } from "./endpoints";

export const fetchTopCharacters = (params = {}) => apiClient.get(JIKAN_ENDPOINTS.topCharacters, { params });
export const fetchCharactersList = (params = {}) =>
  apiClient.get(JIKAN_ENDPOINTS.charactersList, { params });
export const fetchCharacterById = (id) => apiClient.get(JIKAN_ENDPOINTS.characterById(id));

export const searchCharacters = (query, params = {}) =>
  apiClient.get(JIKAN_ENDPOINTS.characterSearch, { params: { q: query, ...params } });
