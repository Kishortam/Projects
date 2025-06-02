import axios from "axios";

// check if we are in development or production
// in production, there is no localhost so we have to make this dynamic.
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

// to eliminate the need to add the base url(http://localhost:5001/api) to every axios request
// function to create axios instance
const api = axios.create({
    // baseURL: "http://localhost:5001/api",
    baseURL: BASE_URL
});

export default api;