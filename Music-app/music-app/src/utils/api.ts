import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // replace with your Nest.js backend URL
});

export default api;
