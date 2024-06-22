import { atom } from "jotai";
import { TelegramUser } from "../pages/AccountCenter/TelegramLoginButton";
import { AlertState, initialAlertState } from "./useAlertState";

export const userInfoAtom = atom<TelegramUser | null>(null);

export const alertStateAtom = atom<AlertState>(initialAlertState);
