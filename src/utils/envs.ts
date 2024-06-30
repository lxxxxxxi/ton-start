export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const DESTINATION_ADDRESS = import.meta.env.VITE_DESTINATION_ADDRESS;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

if (!DESTINATION_ADDRESS) {
    throw new Error("DESTINATION_ADDRESS is not defined");
}
