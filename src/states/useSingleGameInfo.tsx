import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface SingleGameInfo {
    code: string;
    gamecode: string;
    gametype: string;
}

export const useSingleGameInfo = () => {
    const [gameInfo, setGameInfo] = useState<SingleGameInfo | null>(null);
    const [searchParams] = useSearchParams();

    const initGameInfo = () => {
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
