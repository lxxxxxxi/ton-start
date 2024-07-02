import React, { useEffect, useState } from "react";
import AppWrapper from "../../components/AppWrapper";
import styled from "styled-components";
import axios from "axios";
import { useAsyncInitialize } from "../../hooks/useAsyncInitialize";
import { GameListItem } from "../../utils/interface";
import { useAsyncRequest } from "../../hooks/useAsyncRequest";
import { getBalance, getGameList, playGame } from "../../request/requests";

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
        const codes = ["PG"];
        const gametypes = ["1", "2", "3", "4", "5", "6"];
        // const codes = ["AG", "PG", "BBIN", "BG"];
        // const gametypes = ["1", "2", "3", "4", "5", "6", "7"];
        const combinations: any[] = [];

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
    const { data: gameList } = useAsyncRequest<GameListItem[]>(() => getGameList(), []);

    // const { gameList } = usePollingGameList();

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
                                getBalance().then(r => {
                                    console.log(r.data.balance);
                                    const balance = r.data.balance;
                                    if (balance > 10) {
                                        playGame(item.code, item.gamecode, item.gametype).then(
                                            res => {
                                                const url = res.data.url;
                                                console.log(res, url);
                                                if (url) {
                                                    window.open(url);
                                                }
                                            }
                                        );
                                    } else {
                                        console.log("余额不足10");
                                    }
                                });
                            }
                        }}
                    >
                        <img src={item.img} alt={item.name} />
                        <div className="title">{item.name}</div>
                    </div>
                ))}
                {/* <button
                    onClick={() =>
                        window.open(
                            "https://gci.b777752.com/forwardGame.do?params=bJJ7qozamLJ8HT+4YobGbMqkB+eu7hBfgAedn3FjxE+cyQt9NHV4ou6oOphVMWsfs3cgf2GQZe/fAIXXYfMw5Qn7gjhDzWEXFrUu7bviteDPaj6mIDZr4Qw60MmanxKYT4IogWHJAacbAVwNhztEh38khiZRwJ2XkFXA4NTjbJEbt9Cp19hYaZ9vqISxZLD1I/QkRa/Pd4bxYPMawFA+XqQtbguQ0nfsqsreL5SNx4vNWcMlFciVIjtnjDaT5hK8q0TNZejwye15SitNKDxo9JtfZtHjpcr17l1L022MuII=&key=3ea8e2ba833fe0fa4564f13fd2025822"
                        )
                    }
                >
                    open
                </button> */}
            </GameListWrapper>
        </AppWrapper>
    );
}
