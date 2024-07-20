import { atom } from "jotai";
import { TelegramUser } from "../pages/AccountCenter/TelegramLoginButton";
import { AlertState } from "./useAlertState";
import { ModalState } from "./useModalState";
import { SingleGameInfo } from "./useSingleGameInfo";

export const userInfoAtom = atom<TelegramUser | null>(null);
export const userBalanceAtom = atom<number | null>(null);

export const initialAlertState: AlertState = {
    title: "",
    isVisible: false,
    message: "",
    type: "info",
};
export const alertStateAtom = atom<AlertState>(initialAlertState);

export const initModalState: ModalState = {
    isVisible: false,
    pendingTime: 4000,
    type: null,
    successState: null,
    errorState: null,
    loadingState: null,
};
export const modalStateAtom = atom<ModalState>(initModalState);

export const gameInfoAtom = atom<SingleGameInfo | null>(null);
