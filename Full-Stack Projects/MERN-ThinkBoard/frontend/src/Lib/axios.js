import axios from "axios";

// to eliminate the need to add the base url(http://localhost:5001/api) to every axios request
// function to create axios instance
const api = axios.create({
    baseURL: "http://localhost:5001/api",
});

export default api;