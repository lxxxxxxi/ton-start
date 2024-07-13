import isMobile from "is-mobile";
import { TelegramUser } from "../pages/AccountCenter/TelegramLoginButton";
import apiRequest from "./apiRequest";
import axios from "axios";
import { errorMonitor } from "events";
import { API_BASE_URL2 } from "@/utils/envs";

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

export const getAccountList = (days: number) => {
    return apiRequest.get(`/api/v1/account/list${!!days ? `?day=${days}` : ""}`);
};

export const getRechargeList = (days: number = 1) => {
    return apiRequest.get(`/api/v1/account/recharge_list${!!days ? `?day=${days}` : ""}`);
};

export const getWithdrawList = (days: number = 1) => {
    return apiRequest.get(`/api/v1/account/withdraw_list${!!days ? `?day=${days}` : ""}`);
};

interface BetRecordsParams {
    limit?: number; // Actual limit applied to request
    offset?: number;
    type?: GameType;
    orderDir?: "asc" | "desc";
    day?: number;
    status?: number;
    code?: string;
}
export const getBetRecords = (data: BetRecordsParams) => {
    return apiRequest.get("/api/v1/game/bet_records", { params: data });
};

type CodeList = "AG" | "PG" | "BBIN" | "BG";
export type GameType = "1" | "2" | "3" | "4" | "5" | "6" | "7";

// gameType = 游戏类型：1真人,2捕鱼,3电子,4彩票,5体育,6棋牌,7电竞
export const getGameList = (code?: CodeList, gametype?: GameType) => {
    return apiRequest.get(`/api/v1/game/list`, {
        params: {
            code,
            gametype,
        },
    });
};

export const loginByTelegram = (params: TelegramUser) => {
    // tg_web_login
    return apiRequest.get("/api/v1/auth/tg_web_login", {
        // return apiRequest.get("/api/v1/auth/tg_login", {
        params,
        paramsSerializer: params => {
            return new URLSearchParams(params).toString();
        },
    });
};

export const loginByTelegramAuthData = (initData: string) => {
    return apiRequest.get(`/api/v1/auth/tg_miniapp_login`, {
        params: {
            initData,
        },
        paramsSerializer: params => {
            return new URLSearchParams(params).toString();
        },
    });
};

export const playGame = (apiCode: string, gameCode: string, gameType: string) => {
    return apiRequest.get("/api/v1/game/play", {
        params: {
            apiCode,
            gameCode,
            gameType,
            isMobile: isMobile() ? 1 : 0, // 0 电脑板 1手机版 默认 1
        },
    });
};

export const getAccountTotal = () => {
    return apiRequest.get(`/api/v1/account/total`);
};
