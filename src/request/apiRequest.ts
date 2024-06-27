import axios from "axios";
import type { AxiosRequestHeaders } from "axios";
import { API_BASE_URL } from "../utils/envs";

const headers: AxiosRequestHeaders = { "Content-Type": "application/json" };
const instance = axios.create({
    // baseURL: API_BASE_URL + "api",
    baseURL: "/pgapi",
    headers,
});

// interceptors
instance.interceptors.request.use(
    config => {
        // do something before request is sent
        const token = localStorage.getItem("access_token");
        if (token) {
            if (!config.headers) {
                config.headers = {};
            }
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // do something with request error
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        // handle response data
        return response;
    },
    error => {
        // handle response error
        console.log("Request error:", error);
        const currentPath = window.location.pathname;
        if (error.response && error.response.status === 401 && !currentPath.includes("login")) {
            console.log("Unauthorized, redirecting to login");
            // window.location.href = "/ton-start/login/"; // Redirect to login page
            window.location.href = window.location.origin + "/ton-start/#/login";
        }
        return Promise.reject(error);
    }
);

const apiRequest = instance;

export default apiRequest;
