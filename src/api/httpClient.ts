import axios from "axios";
import { BACKEND_URL } from "../config";

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if (["post", "put", "patch"].includes((config.method || "").toLowerCase())) {
    config.headers = config.headers || {};
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = String(error?.config?.url || "");
    const isAuthBootstrap = requestUrl.includes("/users/me");
    const isLogin = requestUrl.includes("/users/login");

    if (status === 401 && !isAuthBootstrap && !isLogin) {
      window.dispatchEvent(new CustomEvent("nexus-obra:unauthorized"));
    }

    return Promise.reject(error);
  },
);

export default apiClient;
