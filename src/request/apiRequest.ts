import axios from "axios";
import type { AxiosRequestHeaders } from "axios";
import { API_BASE_URL } from "../utils/envs";

const apiRequest = (needToken: boolean = false) => {
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
            console.log(token);

            if (needToken && !token) {
                // throw new Error("Please login first");
                console.log("Please login first");
                return new Promise(() => {});
            }
            if (needToken && token) {
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
            return Promise.reject(error);
        }
    );

    return instance;
};

export default apiRequest;
