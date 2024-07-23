import { useAtom } from "jotai";
import { gameUrlAtom } from "./atoms";
import { PageKey, useNavigateTo } from "@/utils/routes";

export const useGameUrl = () => {
    const [gameUrl, setGameUrl] = useAtom(gameUrlAtom);
    console.log(gameUrl);

    const openGame = (url: string) => {
        setGameUrl(url);
    };

    const clearGameUrl = () => {
        setGameUrl(null);
    };

    return {
        gameUrl,
        openGame,
        clearGameUrl,
    };
};
