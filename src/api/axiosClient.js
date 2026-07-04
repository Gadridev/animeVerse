import axios from "axios";

const JIKAN_BASE_URL = import.meta.env.VITE_JIKAN_BASE_URL || "https://api.jikan.moe/v4";

const MIN_REQUEST_INTERVAL_MS = 400;

const apiClient = axios.create({
  baseURL: JIKAN_BASE_URL,
  timeout: 10000,
});

let lastRequestAt = 0;

apiClient.interceptors.request.use((config) => {
  const now = Date.now();
  const earliestAllowed = lastRequestAt + MIN_REQUEST_INTERVAL_MS;
  const delay = Math.max(0, earliestAllowed - now);
  lastRequestAt = Math.max(now, earliestAllowed);

  if (delay === 0) return config;
  return new Promise((resolve) => setTimeout(() => resolve(config), delay));
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const jikanMessage = error.response?.data?.message;

    const message =
      jikanMessage ||
      (status === 429
        ? "Trop de requêtes envoyées à l'API Jikan. Réessayez dans quelques secondes."
        : status === 404
        ? "Ressource introuvable sur Jikan."
        : error.message || "Erreur réseau inconnue.");

    return Promise.reject({ status, message, original: error });
  }
);

export default apiClient;
