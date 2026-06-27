const isLocalHost =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1", "0.0.0.0"].includes(window.location.hostname);

export const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (isLocalHost ? "http://localhost:3000" : "/api");