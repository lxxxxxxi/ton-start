import { useAtom } from "jotai";
import { userBalanceAtom, userInfoAtom } from "./atoms";
import { TelegramUser } from "../pages/AccountCenter/TelegramLoginButton";
import { useAsyncRequest } from "../hooks/useAsyncRequest";
import { getBalance } from "../request/requests";

export const useUserInfo = () => {
    const [user, setUser] = useAtom(userInfoAtom);

    const updateUserInfo = (userInfo: TelegramUser) => {
        setUser(userInfo);
    };

    const clearUserInfo = () => {
        setUser(null);
    };

    return { user, updateUserInfo, clearUserInfo };
};

export const useBalance = () => {
    const [balance, setBalance] = useAtom(userBalanceAtom);

    const updateUserBalance = (balance: { balance: number }) => {
        setBalance(balance.balance);
    };

    const clearUserBalance = () => {
        setBalance(null);
    };

    const { execute: fetchBalance, loading } = useAsyncRequest(getBalance, [], updateUserBalance);

    return { balance, fetchAndUpdateUserBalance: fetchBalance, clearUserBalance, loading };
};
