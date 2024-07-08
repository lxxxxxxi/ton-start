import React from "react";
import {
    BackIconImg,
    LeaderImg,
    MenuIconImg,
    Cloud1Img,
    Cloud2Img,
    StartButtonImg,
    BalanceBoxImg,
    StartButtonPressedImg,
    CuteIcon1Img,
    CuteIcon2Img,
    CuteIcon3Img,
    CuteIcon4Img,
    CuteIcon6Img,
    CoinIcon5Img,
} from "@/assets/imgs";
import { CoinWrapper } from "../styled/styled";
import { PageKey, useNavigateTo } from "@/utils/routes";
import TLoader from "../Common/TLoader";
import { useBalance } from "@/states/useUserInfo";
import { RefreshCw } from "react-feather";
import MenuList from "../MenuList";
import { MenuListContent, PageLayoutWrapper } from "./styled";

export default function PageLayout({
    header,
    isNeedStartButton = false,
    children,
}: {
    header: string;
    isNeedStartButton?: boolean;
    children: React.ReactNode;
}) {
    const navigate = useNavigateTo();
    const { balance, loading: isLoadingBalance, fetchAndUpdateUserBalance } = useBalance();

    const location = window.location.href;
    const shouldChildUnderCloud =
        location.includes(PageKey.GameList) ||
        location.includes(PageKey.BettingList) ||
        location.includes(PageKey.PayHistory) ||
        location.includes(PageKey.WithdrawHistory);

    const menuLists = [
        {
            key: "1",
            name: "个人中心",
            path: PageKey.AccountCenter,
        },
        {
            key: "2",
            name: "账户明细",
            path: PageKey.AccountList,
        },
        {
            key: "3",
            name: "投注列表",
            path: PageKey.BettingList,
        },
    ];

    return (
        <PageLayoutWrapper
            isNeedStartButton={isNeedStartButton}
            shouldChildUnderCloud={shouldChildUnderCloud}
        >
            <div className="header">
                <BackIconImg
                    width={"50px"}
                    className="icon"
                    onClick={() => window.history.go(-1)}
                />
                <div className="text">{header}</div>
                <LeaderImg width={"70%"} />
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
                    <MenuIconImg width={"50px"} className="icon" />
                </MenuList>
            </div>
            <div className="children">{children}</div>
            {isNeedStartButton && (
                <div className="button-wrapper">
                    <StartButtonImg width="200px" className="start-button" />
                    <StartButtonPressedImg width="200px" className="start-button-pressed" />
                    <div className="start-text" onClick={() => navigate(PageKey.GameList)}>
                        PLAY
                    </div>
                </div>
            )}
            {isNeedStartButton && <Cloud2Img width="110%" className="cloud-green" />}
            <Cloud1Img width="110%" className="cloud-white" />
            <div className="balance-box">
                <div className="balance-text">
                    <CoinWrapper>¥</CoinWrapper>
                    <span className="balance-num">
                        {isLoadingBalance ? <TLoader /> : balance || 0}
                    </span>
                    <RefreshCw
                        onClick={fetchAndUpdateUserBalance}
                        width={16}
                        strokeWidth={4}
                        style={{ cursor: "pointer" }}
                    />
                </div>
                <BalanceBoxImg width="100%" />
                <CoinIcon5Img width="45px" className="coin-icon" />
            </div>
            {isNeedStartButton && (
                <div className="icons-wrapper">
                    <CuteIcon1Img width="30px" style={{ top: "0px", left: "10px" }} />
                    <CuteIcon2Img width="22px" style={{ top: "30px", right: "10px" }} />
                    <CuteIcon3Img width="20px" style={{ top: "180px", right: "20px" }} />
                    <CuteIcon4Img width="26px" style={{ top: "170px", left: "10px" }} />
                    <CuteIcon6Img width="80px" style={{ top: "70px", left: "10px" }} />
                </div>
            )}
        </PageLayoutWrapper>
    );
}
