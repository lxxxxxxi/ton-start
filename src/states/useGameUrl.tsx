import { useAtom } from "jotai";
import { gameUrlAtom } from "./atoms";
import { PageKey, useNavigateTo } from "@/utils/routes";

export const useGameUrl = () => {
    const [gameUrl, setGameUrl] = useAtom(gameUrlAtom);
    const navigate = useNavigateTo();

    console.log(gameUrl);

    const openGame = (url: string) => {
        setGameUrl(url);
        navigate(PageKey.Play);
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
