import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GameListItem } from "../../utils/interface";
import { useAsyncRequest } from "../../hooks/useAsyncRequest";
import { GameType, getBalance, getGameList, playGame } from "../../request/requests";
import PageLayout from "@/components/Layouts/PageLayout";
import TDropdown from "@/components/Common/TDropDown";
import { useNavigate, useSearchParams } from "react-router-dom";
import TLoadingBar from "@/components/Common/TLoadingBar";
import TInput from "@/components/Common/TInput";
import { Search } from "react-feather";
import { useHandlePlayGame } from "@/request/loginByTelegramAuth";

const GameListWrapper = styled.div`
    .game-header {
        display: flex;
        justify-content: space-between;
        gap: 10px;

        .search {
            width: 60%;
        }
        .type {
            width: 40%;
        }
    }
    .list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(28%, 1fr));
        gap: 20px;
        padding: 20px 4px;

        .card {
            border: 2px solid #341d1a;
            background-color: #ffffff;
            box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            overflow: hidden;

            :hover {
                cursor: pointer;
                transform: scale(1.05);
                transition: all 0.3s;
            }

            img {
                width: 100%;
                aspect-ratio: 1;
                overflow: hidden;
            }

            .title {
                text-align: center;
                font-size: 14px;
            }
        }
    }
`;

const GameTypeOptions = [
    {
        key: "0",
        label: "热门",
    },
    {
        key: "1",
        label: "真人",
    },
    {
        key: "2",
        label: "捕鱼",
    },
    {
        key: "3",
        label: "电子",
    },
    {
        key: "4",
        label: "彩票",
    },
    {
        key: "5",
        label: "体育",
    },
    {
        key: "6",
        label: "棋牌",
    },
    {
        key: "7",
        label: "电竞",
    },
];

export default function GameList() {
    const [selectedTypeOption, setSelectedTypeOption] = useState<string>("0");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const hanldePlayGame = useHandlePlayGame();

    const { data: gameList, loading } = useAsyncRequest<GameListItem[]>(
        () =>
            getGameList(
                undefined,
                selectedTypeOption === "0" ? undefined : (selectedTypeOption as GameType)
            ),
        [selectedTypeOption]
    );

    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get("type") || "0";

    useEffect(() => {
        if (type && GameTypeOptions.find(item => item.key === type)) {
            setSelectedTypeOption(type);
        }
    }, [type]);

    const handleTypeChange = (key: string) => {
        setSelectedTypeOption(key);
        setSearchParams({ type: key });
    };

    const filteredGameList = gameList?.filter(game =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <PageLayout header="游戏中心" isNeedHidden>
            <GameListWrapper>
                <div className="game-header">
                    <div className="search">
                        <TInput
                            placeholder="Search...."
                            suffixIcon={<Search size={"20px"} />}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="type">
                        <TDropdown
                            value={selectedTypeOption}
                            changeSelected={handleTypeChange}
                            options={GameTypeOptions}
                        />
                    </div>
                </div>

                {loading ? (
                    <TLoadingBar text="正在加载游戏列表" />
                ) : (
                    <div className="list">
                        {filteredGameList?.map((item, index) => (
                            <div
                                key={index}
                                className="card"
                                onClick={() => {
                                    hanldePlayGame(item.code, item.gamecode, item.gametype);
                                    // navigate(
                                    //     `/game?code=${item.code}&gamecode=${item.gamecode}&gametype=${item.gametype}`
                                    // );
                                }}
                            >
                                <img src={item.img} alt={item.name} />
                                <div className="title">{item.name}</div>
                            </div>
                        ))}
                    </div>
                )}
            </GameListWrapper>
        </PageLayout>
    );
}
