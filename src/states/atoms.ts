import { atom } from "jotai";
import { TelegramUser } from "../pages/AccountCenter/TelegramLoginButton";
import { AlertState } from "./useAlertState";

export const userInfoAtom = atom<TelegramUser | null>(null);
export const userBalanceAtom = atom<number | null>(null);

export const initialAlertState: AlertState = {
    isVisible: false,
    message: "",
    type: "info",
};
export const alertStateAtom = atom<AlertState>(initialAlertState);
