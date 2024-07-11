import { getTeleUserName } from "./tele";

export const ACCESS_TOKEN_KEY = getTeleUserName() + "_access_token";

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY) || "";
export const setAccessToken = (token: string) => localStorage.setItem(ACCESS_TOKEN_KEY, token);
