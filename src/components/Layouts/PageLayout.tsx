import React from "react";
import styled from "styled-components";
import {
    BackIconImg,
    LeaderImg,
    MenuIconImg,
    Wave,
    Cloud1Img,
    Cloud2Img,
    LoginBannerImg,
    QuestionIconImg,
    ShiningBgImg,
    StartButtonImg,
    StartImg,
    BalanceBoxImg,
} from "@/assets/imgs";
import { CoinWrapper } from "../styled/styled";
import { PageKey, useNavigateTo } from "@/utils/routes";
import TLoader from "../Common/TLoader";
import { useBalance } from "@/states/useUserInfo";
import { RefreshCw } from "react-feather";
import MenuList from "../MenuList";

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    padding: 20px;

    background: url(${Wave});
    background-color: ${({ theme }) => theme.Colors.Bg2};

    position: relative;
    overflow: hidden;

    .header {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100px;

        .text {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-size: 22px;
            color: white;
            text-align: center;
            font-weight: 600;
        }
    }

    .children {
        height: 50%;
        overflow: scroll;
        z-index: 100;

        ::-webkit-scrollbar {
            display: none;
        }
    }

    .start-button {
        position: absolute;
        bottom: 180px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
    }

    .start-text {
        position: absolute;
        bottom: 285px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 40;
        cursor: pointer;
    }

    .cloud-white {
        position: absolute;
        left: -10%;
        bottom: 0;
        z-index: 12;
    }

    .cloud-green {
        position: absolute;
        left: -10%;
        bottom: 100px;
        z-index: 4;
    }

    .balance-box {
        position: absolute;
        bottom: 0;
        left: 50%;
        z-index: 20;
        transform: translateX(-50%);

        width: 60%;

        .balance-text {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 16px;

            font-size: 24px;
            font-weight: 600;
            text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
            color: white;

            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
`;

const MenuListContent = styled.div`
    .item {
        height: 30px;
        line-height: 30px;
        margin-bottom: 6px;
        cursor: pointer;
        padding: 0 6px;
        border-radius: 8px;

        :last-child {
            margin-bottom: 0;
        }

        :hover {
            background-color: rgba(202, 202, 202, 0.3);
        }
    }
`;

const menuLists = [
    {
        key: "1",
        name: "投注列表",
        path: PageKey.BettingList,
    },
];

export default function PageLayout({
    header,
    children,
}: {
    header: string;
    children: React.ReactNode;
}) {
    const navigate = useNavigateTo();
    const { balance, loading: isLoadingBalance, fetchAndUpdateUserBalance } = useBalance();

    return (
        <Wrapper>
            <div className="header">
                <BackIconImg width={"50px"} />
                <div className="text">{header}</div>
                <LeaderImg width={"70%"} className="leader-img" />
                <MenuList
                    content={
                        <MenuListContent>
                            {menuLists.map(item => (
                                <div
                                    key={item.key}
                                    className="item"
                                    onClick={() => navigate(item.path)}
                                >
                                    {item.name}
                                </div>
                            ))}
                        </MenuListContent>
                    }
                >
                    <MenuIconImg width={"50px"} />
                </MenuList>
            </div>
            <div className="children">{children}</div>
            <div>
                <StartButtonImg width="250px" className="start-button" />
                <StartImg
                    width="90px"
                    className="start-text"
                    onClick={() => {
                        navigate(PageKey.GameList);
                    }}
                />
            </div>
            <Cloud1Img width="110%" className="cloud-white" />
            <Cloud2Img width="110%" className="cloud-green" />
            <div className="balance-box">
                <div className="balance-text">
                    <CoinWrapper>¥</CoinWrapper>
                    <span>{isLoadingBalance ? <TLoader /> : balance || 0}</span>
                    <RefreshCw
                        onClick={fetchAndUpdateUserBalance}
                        width={16}
                        strokeWidth={4}
                        style={{ cursor: "pointer" }}
                    />
                </div>
                <BalanceBoxImg width="100%" />
            </div>
        </Wrapper>
    );
}
