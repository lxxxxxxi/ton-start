export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const GITHUB_REPOSITORY = import.meta.env.VITE_GITHUB_REPOSITORY;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}
