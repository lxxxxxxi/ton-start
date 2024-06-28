import { TelegramUser } from "../pages/AccountCenter/TelegramLoginButton";
import apiRequest from "./apiRequest";
import axios from "axios";

export const getExchangeRate = () => {
    return axios.get("https://api.coinbase.com/v2/exchange-rates?currency=USDT");
};

export const getBalance = () => {
    return apiRequest.get("/api/v1/account/balance");
};

export const getTgProfile = () => {
    return apiRequest.get("/api/v1/auth/tg_profile");
};

export const checkWithdraw = () => {
    return apiRequest.get("/api/v1/account/check_withdraw");
};

export const createRechargeOrder = (orderData: { amount: number }) => {
    return apiRequest.post("/api/v1/account/create_recharge_order", orderData);
};

export const createWithdrawOrder = (orderData: { address: string; amount: number }) => {
    return apiRequest.post("/api/v1/account/create_withdraw_order", orderData);
};

export const getAccountList = (days: number = 7) => {
    return apiRequest.get(`/api/v1/account/list?day=${days}`);
};

export const getRechargeList = () => {
    return apiRequest.get("/api/v1/account/recharge_list");
};

export const getWithdrawList = () => {
    return apiRequest.get("/api/v1/account/withdraw_list");
};

export const getGameList = (code: string, gametype: string) => {
    return apiRequest.get(`/api/v1/game/list`, {
        params: {
            code,
            gametype,
        },
    });
};

export const loginByTelegram = (params: TelegramUser) => {
    return apiRequest.get("/api/v1/auth/tg_login", {
        params,
        paramsSerializer: params => {
            return new URLSearchParams(params).toString();
        },
    });

    // return apiWithoutToken.get(
    //     "/v1/auth/tg_login?id=5434528858&first_name=xixi&last_name=Liu&username=xixiliuooo&photo_url=https%3A%2F%2Ft.me%2Fi%2Fuserpic%2F320%2FuusA1uYd2mE4gApmxaYKM_8dUQ-uPVh1WmabYqtsNgUTPPTR0BYqVqlN7gDX75yW.jpg&auth_date=1719046266&hash=b6f788a7731acd91de43da63db4122e4f7579376e774283a829a0dc9af35c762"
    // );
};
