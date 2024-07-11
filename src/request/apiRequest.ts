import axios from "axios";
import type { AxiosRequestHeaders } from "axios";
import { API_BASE_URL } from "../utils/envs";
import { TELE } from "@/utils/tele";
import { loginByTelegramAuthData } from "./requests";

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
        const token = localStorage.getItem("access_token");
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

const loginByTelegramAuth = (loginCallback?: () => void) => {
    const initData = TELE.initData;
    if (!initData) {
        console.error("initData is null");
    } else {
        loginByTelegramAuthData(initData)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    const result = res.data;
                    if (result.access_token) {
                        localStorage.setItem("access_token", result.access_token);
                        if (loginCallback) loginCallback();
                    } else {
                        // 如果无法登陆 => 还是跳转到 login
                        console.log("not get access_token");
                        window.location.href = window.location.origin + "/ton-start/#/";
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
};

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
