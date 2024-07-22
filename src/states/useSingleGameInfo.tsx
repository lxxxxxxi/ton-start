import { useAtom } from "jotai";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { singleGameInfoAtom } from "./atoms";

export interface SingleGameInfo {
    code: string;
    gamecode: string;
    gametype: string;
}

export const useSingleGameInfo = () => {
    const [gameInfo, setGameInfo] = useAtom<SingleGameInfo | null>(singleGameInfoAtom);
    const [searchParams] = useSearchParams();

    const initGameInfo = () => {
        if (gameInfo) return null;

        const code = searchParams.get("code");
        const gamecode = searchParams.get("gamecode");
        const gametype = searchParams.get("gametype");
        if (code && gamecode && gametype) {
            setGameInfo({ code, gamecode, gametype });
        }
    };

    return {
        gameInfo,
        initGameInfo,
    };
};
