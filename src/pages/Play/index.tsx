import { gameUrlAtom } from "@/states/atoms";
import { useGameUrl } from "@/states/useGameUrl";
import { useEffect } from "react";

export default function Play() {
    const { gameUrl, clearGameUrl } = useGameUrl();

    if (!gameUrl) {
        clearGameUrl();
        return (
            <div style={{ textAlign: "center", paddingTop: "20px" }}>
                游戏加载有误，请返回重试。
            </div>
        );
    }

    useEffect(() => {
        return () => {
            clearGameUrl();
        };
    }, []);

    return (
        <iframe
            src={gameUrl}
            style={{
                width: "100%",
                height: "100%",
                position: "fixed",
                top: 0,
                left: 0,
                border: "none",
            }}
        ></iframe>
    );
}
