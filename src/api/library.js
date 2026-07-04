import localApiClient from "./localApiClient";

export const fetchLibraryStatusByAnimeId = (animeId) =>
  localApiClient
    .get("/library", { params: { animeId } })
    .then((res) => res.data);

export const createLibraryEntry = (payload) =>
  localApiClient.post("/library", payload).then((res) => res.data);

export const updateLibraryEntry = ({ id, ...payload }) =>
  localApiClient.patch(`/library/${id}`, payload).then((res) => res.data);

export const deleteLibraryEntry = (id) =>
  localApiClient.delete(`/library/${id}`).then((res) => res.data);
export const fetchAllLibrary = () =>
  localApiClient.get("/library").then((res) => res.data);