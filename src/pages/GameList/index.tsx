import React, { useEffect, useState } from "react";
import AppWrapper from "../../components/AppWrapper";
import styled from "styled-components";
import axios from "axios";
import { useAsyncInitialize } from "../../hooks/useAsyncInitialize";
import { GameListItem } from "../../utils/interface";
import { useAsyncRequest } from "../../hooks/useAsyncRequest";
import { GameType, getBalance, getGameList, playGame } from "../../request/requests";
import PageLayout from "@/components/Layouts/PageLayout";
import TDropdown from "@/components/Common/TDropDown";
import { useSearchParams } from "react-router-dom";
import TLoadingBar from "@/components/Common/TLoadingBar";
import { useModalState } from "@/states/useModalState";

const GameListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    row-gap: 20px;
    padding: 20px 10px;

    .card {
        width: 28%;
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
    const { openLoadingModal, openErrorModal } = useModalState();

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

    return (
        <PageLayout header="游戏中心">
            <GameListWrapper>
                <TDropdown
                    value={selectedTypeOption}
                    changeSelected={handleTypeChange}
                    options={GameTypeOptions}
                />
                {loading ? (
                    <TLoadingBar text="正在加载游戏列表" />
                ) : (
                    gameList?.map((item, index) => (
                        <div
                            key={index}
                            className="card"
                            onClick={() => {
                                openLoadingModal(
                                    "加载中....",
                                    <div>游戏正在努力加载中，请稍后。</div>,
                                    6000
                                );
                                // console.log(item.code, item.gamecode, item.gametype);
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
                                                    } else {
                                                        openErrorModal(
                                                            "游戏加载异常",
                                                            <div>请联系 TG 管理员</div>
                                                        );
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
                    ))
                )}
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
        </PageLayout>
    );
}
