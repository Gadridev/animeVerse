import axios from "axios";

const localApiClient = axios.create({
  baseURL: "http://localhost:3001",
});

export default localApiClient;
