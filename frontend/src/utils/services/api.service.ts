import axios from "axios";

const apiUserFetcherService = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 15000,
});

apiUserFetcherService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiUserFetcherService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiUserFetcherService;
