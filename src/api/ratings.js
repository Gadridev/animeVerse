import localApiClient from "./localApiClient";
export const fetchAllRatings = () =>
  localApiClient.get("/ratings").then((res) => res.data);
export const fetchRatingByAnimeId = (animeId) =>
  localApiClient
    .get("/ratings", { params: { animeId } })
    .then((res) => res.data);

export const createRating = (payload) =>
  localApiClient.post("/ratings", payload).then((res) => res.data);

export const updateRating = ({ id, ...payload }) =>
  localApiClient.patch(`/ratings/${id}`, payload).then((res) => res.data);

export const deleteRatings = (id) =>
  localApiClient.delete(`/ratings/${id}`).then((res) => res.data);
