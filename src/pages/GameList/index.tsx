import React from "react";
import AppWrapper from "../../components/AppWrapper";
import styled from "styled-components";
import axios from "axios";
import { useAsyncInitialize } from "../../hooks/useAsyncInitialize";
import { GameListItem } from "../../utils/interface";

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

export default function GameList() {
    const fetchGameList = async () => {
        const { data } = await axios.get("/gameslist.json");
        return data.data.gamelist;
    };

    const gameList: GameListItem[] = useAsyncInitialize(fetchGameList);

    console.log(gameList);

    return (
        <AppWrapper title="游戏中心">
            <GameListWrapper>
                {gameList?.map((item, index) => (
                    <div key={index} className="card">
                        <img src={item.img} alt={item.name} />
                        <div className="title">{item.name}</div>
                    </div>
                ))}
            </GameListWrapper>
        </AppWrapper>
    );
}
