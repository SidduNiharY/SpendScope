import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080",
  withCredentials: true, // if backend uses cookies
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    // You can map backend errors to UI-friendly messages here later
    return Promise.reject(err);
  }
);