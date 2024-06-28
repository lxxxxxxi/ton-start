export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const GITHUB_REPOSITORY = import.meta.env.VITE_GITHUB_REPOSITORY;
export const DESTINATION_ADDRESS = import.meta.env.VITE_DESTINATION_ADDRESS;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

if (!GITHUB_REPOSITORY) {
    throw new Error("VITE_GITHUB_REPOSITORY is not defined");
}
