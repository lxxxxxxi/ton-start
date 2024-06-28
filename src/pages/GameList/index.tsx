import React, { useEffect, useState } from "react";
import AppWrapper from "../../components/AppWrapper";
import styled from "styled-components";
import axios from "axios";
import { useAsyncInitialize } from "../../hooks/useAsyncInitialize";
import { GameListItem } from "../../utils/interface";
import { useAsyncRequest } from "../../hooks/useAsyncRequest";
import { getGameList, playGame } from "../../request/requests";

const GameListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    row-gap: 20px;
    padding: 30px 10px;

    .card {
        width: 28%;
        :hover {
            cursor: pointer;
            transform: scale(1.05);
            transition: all 0.3s;
        }

        img {
            width: 100%;
            aspect-ratio: 1;
            overflow: hidden;
            border-radius: 10px;
        }

        .title {
            text-align: center;
            font-size: 14px;
        }
    }
`;

const usePollingGameList = () => {
    const [gameList, setGameList] = useState<GameListItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const codes = ["AG"];
        const gametypes = ["1", "2", "3", "4", "5", "6"];
        // const codes = ["AG", "PG", "BBIN", "BG"];
        // const gametypes = ["1", "2", "3", "4", "5", "6", "7"];
        const combinations = [];

        codes.forEach(code => {
            gametypes.forEach(gametype => {
                combinations.push({ code, gametype });
            });
        });

        const fetchGameLists = async () => {
            setLoading(true);
            setError(null);

            try {
                const results = await Promise.all(
                    combinations.map(({ code, gametype }) => getGameList(code, gametype))
                );

                const allGameLists = results.map(result => result.data);
                setGameList(allGameLists.flat());
            } catch (err) {
                setError(String(err));
            } finally {
                setLoading(false);
            }
        };

        fetchGameLists();
    }, []);

    return { gameList, loading, error };
};

export default function GameList() {
    // const { data: gameList } = useAsyncRequest(() => getGameList("BBIN", "6"), []);

    const { gameList } = usePollingGameList();

    console.log(gameList);

    return (
        <AppWrapper title="游戏中心">
            <GameListWrapper>
                {gameList?.map((item, index) => (
                    <div
                        key={index}
                        className="card"
                        onClick={() => {
                            console.log(item.code, item.gamecode, item.gametype);
                            if (item.code && item.gamecode && item.gametype) {
                                playGame(item.code, item.gamecode, item.gametype).then(res => {
                                    console.log(res.url);
                                });
                            }
                        }}
                    >
                        <img src={item.img} alt={item.name} />
                        <div className="title">{item.name}</div>
                    </div>
                ))}
            </GameListWrapper>
        </AppWrapper>
    );
}
