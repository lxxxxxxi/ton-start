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
import { CreditCard, DollarSign, FileText, List, RefreshCw, User } from "react-feather";
import ToolTips from "../MenuList";
import { MenuListContent, PageLayoutWrapper } from "./styled";
import { TButton } from "../Common/TButton";

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
            icon: <User size={18} strokeWidth={3} />,
            path: PageKey.AccountCenter,
        },
        {
            key: "2",
            name: "账户明细",
            icon: <FileText size={18} strokeWidth={3} />,
            path: PageKey.AccountList,
        },
        {
            key: "3",
            name: "投注记录",
            icon: <List size={18} strokeWidth={3} />,
            path: PageKey.BettingList,
        },
        {
            key: "4",
            name: "充值记录",
            icon: <DollarSign size={18} strokeWidth={3} />,
            path: PageKey.PayHistory,
        },
        {
            key: "5",
            name: "提现记录",
            icon: <CreditCard size={18} strokeWidth={3} />,
            path: PageKey.WithdrawHistory,
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
                <ToolTips
                    content={
                        <MenuListContent>
                            {menuLists.map(item => (
                                <div
                                    key={item.key}
                                    className="item"
                                    onClick={() => navigate(item.path)}
                                >
                                    {item.icon} {item.name}
                                </div>
                            ))}
                        </MenuListContent>
                    }
                >
                    <MenuIconImg width={"50px"} className="icon" />
                </ToolTips>
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
                    <ToolTips
                        direction="top"
                        content={
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                    margin: "4px",
                                }}
                            >
                                <TButton
                                    type="secondary"
                                    onClick={() => navigate(PageKey.Withdraw)}
                                >
                                    去提现{" "}
                                </TButton>
                                <TButton onClick={() => navigate(PageKey.Pay)}>去充值</TButton>
                            </div>
                        }
                    >
                        <span className="balance-num">
                            {isLoadingBalance ? <TLoader /> : balance || 0}
                        </span>
                    </ToolTips>
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
