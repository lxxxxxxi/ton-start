import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { GameListItem } from "@/utils/interface";
import { getBalance, getGameList, playGame } from "@/request/requests";
import { useAsyncRequest } from "@/hooks/useAsyncRequest";
import PageLayout from "@/components/Layouts/PageLayout";
import { TButton } from "@/components/Common/TButton";
import { ArrowLeft, ArrowRight } from "react-feather";
import { PageKey } from "@/utils/routes";
import { useTelegramWebApp } from "@/utils/tele";
import { useModalState } from "@/states/useModalState";

const GameDetailsWrapper = styled.div`
    .carousel {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        width: 100%;
        max-width: 400px;
        position: relative;
    }

    .carousel-inner {
        display: flex;
        transition: transform 0.5s ease;
    }

    .carousel-item {
        min-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        padding: 20px;
        box-sizing: border-box;
    }

    .card {
        ${({ theme }) => theme.FlexCenter}

        width: 230px;
        height: 230px;
        border: 2px solid #341d1a;
        background-color: #ffffff;
        box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        overflow: hidden;
    }

    .title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .details {
        margin-top: 20px;
        font-size: 16px;
        display: flex;
        gap: 10px;
    }

    .carousel-control {
        ${({ theme }) => theme.FlexCenter}
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.1);
        color: #fff;
        border: none;
        cursor: pointer;
        padding: 16px 8px;
        border-radius: 3px;
        height: 200px;
        z-index: 10;

        :hover {
            background: rgba(0, 0, 0, 0.3);
        }
    }

    .carousel-control.left {
        left: 0;
    }

    .carousel-control.right {
        right: 0;
    }
`;

const GameDetails = () => {
    const [game, setGame] = useState<GameListItem | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const { showMainButton, clearMainButton } = useTelegramWebApp();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get("code");
    const gamecode = searchParams.get("gamecode");
    const gametype = searchParams.get("gametype");

    const { data: gameList } = useAsyncRequest<GameListItem[]>(() => getGameList(), []);

    const { openLoadingModal, openErrorModal, closeModal } = useModalState();

    const hanldePlayGame = (code: string, gamecode: string, gametype: string) => {
        openLoadingModal("加载中....", <div>游戏正在努力加载中，请稍后。</div>, 60000);
        // console.log(item.code, item.gamecode, item.gametype);
        if (code && gamecode && gametype) {
            getBalance().then(r => {
                console.log(r.data.balance);
                const balance = r.data.balance;
                if (balance > 10) {
                    playGame(code, gamecode, gametype).then(res => {
                        const url = res.data.url;
                        console.log(url);
                        if (url) {
                            window.open(url);
                            closeModal();
                        } else {
                            openErrorModal("游戏加载异常", <div>请联系 TG 管理员</div>);
                        }
                    });
                } else {
                    openErrorModal(
                        "余额不足",
                        <TButton size="small" onClick={() => navigate(PageKey.Pay)}>
                            去充值
                        </TButton>
                    );
                }
            });
        }
    };

    useEffect(() => {
        if (!code || !gamecode || !gametype) {
            navigate("/gamelist");
            return;
        }
        const game = gameList?.find(
            item => item.code === code && item.gamecode === gamecode && item.gametype === gametype
        );

        console.log(code, gamecode, gametype, game);

        if (game) {
            setGame(game);
        }
    }, [code, gamecode, gametype, gameList, navigate]);

    //  showMainButton("开始游戏",() =>  hanldePlayGame())

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!game) {
                navigate("/gamelist");
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [game, navigate]);

    if (!game || !gameList) {
        return null; // 或者你可以显示一个加载动画
    }

    const handleShare = () => {};
    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : gameList.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex < gameList.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <PageLayout header="游戏详情">
            <GameDetailsWrapper>
                <div className="carousel">
                    <button className="carousel-control left" onClick={handlePrev}>
                        <ArrowLeft />
                    </button>
                    <div
                        className="carousel-inner"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {gameList.map((item, index) => (
                            <div key={index} className="carousel-item">
                                <div className="title">{item.name}</div>
                                <div className="card">
                                    <img src={item.img} alt={item.name} width={"100%"} />
                                </div>
                                <div className="details">
                                    <TButton size="small" onClick={() => {}}>
                                        分享给朋友
                                    </TButton>
                                    <TButton
                                        size="small"
                                        type="secondary"
                                        onClick={() => navigate(PageKey.GameList)}
                                    >
                                        更多游戏
                                    </TButton>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control right" onClick={handleNext}>
                        <ArrowRight />
                    </button>
                </div>
            </GameDetailsWrapper>
        </PageLayout>
    );
};

export default GameDetails;
