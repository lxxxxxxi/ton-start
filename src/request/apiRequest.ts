import axios from "axios";
import type { AxiosRequestHeaders } from "axios";
import { API_BASE_URL } from "../utils/envs";
import { getAccessToken } from "@/utils/accessToken";
import { loginByTelegramAuth } from "./loginByTelegramAuth";

const headers: AxiosRequestHeaders = {
    "Content-Type": "application/json",
};
const instance = axios.create({
    baseURL: API_BASE_URL,
    // baseURL: "/pgapi",
    headers,
    timeout: 10000,
});

// interceptors
instance.interceptors.request.use(
    config => {
        // do something before request is sent
        const token = getAccessToken();
        if (token) {
            if (!config.headers) {
                config.headers = {};
            }
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
        // return Promise.reject();
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
        const currentHash = window.location.hash;
        if (error.response && error.response.status === 401 && currentHash !== "#/") {
            console.log("Unauthorized, redirecting to login");
            // window.location.href = window.location.origin + "/ton-start/#/";
            loginByTelegramAuth();
        }
        return Promise.reject(error);
    }
);

const apiRequest = instance;

export default apiRequest;
