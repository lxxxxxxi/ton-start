import { atom } from "jotai";
import { TelegramUser } from "../pages/AccountCenter/TelegramLoginButton";

export const userInfoAtom = atom<TelegramUser | null>(null);
