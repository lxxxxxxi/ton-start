import axios from "axios";
import type { AxiosRequestHeaders } from "axios";
import { API_BASE_URL } from "../utils/envs";

const apiRequest = (token?: string) => {
    const headers: AxiosRequestHeaders = {};

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const instance = axios.create({
        baseURL: API_BASE_URL,
        headers,
    });

    // interceptors
    instance.interceptors.request.use(
        config => {
            // do something before request is sent
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
            return Promise.reject(error);
        }
    );

    return instance;
};

export default apiRequest;
