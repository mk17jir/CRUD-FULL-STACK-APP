import axios from "axios";

// ✅ Use environment variable if available, fallback to localhost for dev
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach JWT token from localStorage to all requests
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AxiosInstance;
