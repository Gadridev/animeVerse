import localApiClient from "./localApiClient";

export const fetchFavorites = () =>
  localApiClient.get("/favorites").then((res) => res.data);

export const addFavorite = (favorite) =>
  localApiClient.post("/favorites", favorite).then((res) => res.data);

export const removeFavorite = (id) =>
  localApiClient.delete(`/favorites/${id}`).then((res) => res.data);
