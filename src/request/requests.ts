import apiRequest from "./apiRequest";

const token = "your_token_here";
const apiWithoutToken = apiRequest();
const apiWithToken = apiRequest(token);

export const getBalance = () => {
    return apiWithToken.get("/api/v1/account/balance");
};

export const checkWithdraw = () => {
    return apiWithToken.get("/api/v1/account/check_withdraw");
};

export const createRechargeOrder = (orderData: { amount: number }) => {
    return apiWithToken.post("/api/v1/account/create_recharge_order", orderData);
};

export const createWithdrawOrder = (orderData: { address: string; amount: number }) => {
    return apiWithToken.post("/api/v1/account/create_withdraw_order", orderData);
};

export const getAccountList = () => {
    return apiWithToken.get("/api/v1/account/list");
};

export const getRechargeList = () => {
    return apiWithToken.get("/api/v1/account/recharge_list");
};

export const getWithdrawList = () => {
    return apiWithToken.get("/api/v1/account/withdraw_list");
};
