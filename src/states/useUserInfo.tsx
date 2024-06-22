import { useAtom } from "jotai";
import { userInfoAtom } from "./atoms";
import { TelegramUser } from "../pages/AccountCenter/TelegramLoginButton";

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
