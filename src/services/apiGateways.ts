import axios from "axios";
import toast from "react-hot-toast";

export const publicGateway = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateGateway = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
privateGateway.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Request Interceptor: Ensure that the URL ends with a trailing slash
// If the URL doesn't terminate with a slash, this interceptor appends one.
privateGateway.interceptors.request.use(
  function (config) {
    if (config.url) {
      if (!config.url.endsWith("/")) {
        config.url += "/";
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
