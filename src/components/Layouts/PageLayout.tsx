import React, { useEffect, useRef, useState } from "react";
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
import {
    CreditCard,
    DollarSign,
    FileText,
    List,
    RefreshCw,
    Send,
    User,
    UserCheck,
} from "react-feather";
import ToolTips from "../MenuList";
import { MenuListContent, PageLayoutWrapper } from "./styled";
import { TButton } from "../Common/TButton";
import TText from "../Common/TText";
import { useLocation } from "react-router-dom";

export default function PageLayout({
    header,
    isNeedStartButton = false,
    isNeedHidden = false,
    children,
}: {
    header: string;
    isNeedStartButton?: boolean;
    isNeedHidden?: boolean;
    children: React.ReactNode;
}) {
    const { pathname } = useLocation();
    const navigate = useNavigateTo();
    const { balance, loading: isLoadingBalance, fetchAndUpdateUserBalance } = useBalance();

    const shouldChildUnderCloud =
        pathname.includes(PageKey.GameList) ||
        pathname.includes(PageKey.BettingList) ||
        pathname.includes(PageKey.PayHistory) ||
        pathname.includes(PageKey.AccountList) ||
        pathname.includes(PageKey.WithdrawHistory);

    const isPayPage = pathname == PageKey.Pay;

    const menuLists = [
        {
            key: "1",
            name: "个人中心",
            icon: <User size={18} strokeWidth={3} />,
            path: PageKey.AccountCenter,
        },
        // {
        //     key: "2",
        //     name: "账户明细",
        //     icon: <FileText size={18} strokeWidth={3} />,
        //     path: PageKey.AccountList,
        // },
        // {
        //     key: "3",
        //     name: "投注记录",
        //     icon: <List size={18} strokeWidth={3} />,
        //     path: PageKey.BettingList,
        // },
        // {
        //     key: "4",
        //     name: "充值记录",
        //     icon: <DollarSign size={18} strokeWidth={3} />,
        //     path: PageKey.PayHistory,
        // },
        // {
        //     key: "5",
        //     name: "提现记录",
        //     icon: <CreditCard size={18} strokeWidth={3} />,
        //     path: PageKey.WithdrawHistory,
        // },
        {
            key: "8",
            name: "Tg 客服",
            icon: <Send size={18} strokeWidth={3} />,
            path: undefined,
            link: "https://t.me/xpocketgames",
        },
        // {
        //     // key: "6",
        //     // name: "查看优惠",
        //     // icon: < size={18} strokeWidth={3} />,
        //     // path: PageKey.,
        // },
        // {
        //     // key: "7",
        //     // name: "推广赚钱",
        //     // icon: < size={18} strokeWidth={3} />,
        //     // path: PageKey.,
        // },
    ];

    const childrenRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        if (isNeedHidden) {
            if (childrenRef.current && footerRef.current && headerRef.current) {
                const handleScroll = () => {
                    if (!childrenRef.current || !footerRef.current || !headerRef.current) return;
                    const currentScrollTop = childrenRef.current.scrollTop;
                    if (currentScrollTop > lastScrollTop) {
                        // 用户正在向下滚动
                        footerRef.current.classList.add("footer-hidden");
                        headerRef.current.classList.add("header-hidden");
                        childrenRef.current.classList.add("children-full");
                    } else {
                        // 用户正在向上滚动
                        footerRef.current.classList.remove("footer-hidden");
                        headerRef.current.classList.remove("header-hidden");
                        childrenRef.current.classList.remove("children-full");
                    }
                    setLastScrollTop(currentScrollTop);
                };

                if (childrenRef.current) {
                    childrenRef.current.addEventListener("scroll", handleScroll);
                }

                return () => {
                    if (childrenRef.current) {
                        childrenRef.current.removeEventListener("scroll", handleScroll);
                    }
                };
            }
        }
    }, [lastScrollTop]);

    return (
        <PageLayoutWrapper
            isNeedStartButton={isNeedStartButton}
            shouldChildUnderCloud={shouldChildUnderCloud}
        >
            <div className="header" ref={headerRef}>
                <BackIconImg
                    width={"48px"}
                    className="icon"
                    onClick={() => window.history.go(-1)}
                />
                <div className="text">{header}</div>
                <LeaderImg width={"58%"} />
                <ToolTips
                    content={
                        <MenuListContent>
                            {menuLists.map(item => (
                                <div
                                    key={item.key}
                                    className="item"
                                    onClick={() => {
                                        if (item.path) navigate(item.path);
                                        else if (item.link) window.open(item.link);
                                    }}
                                >
                                    {item.icon} {item.name}
                                </div>
                            ))}
                        </MenuListContent>
                    }
                >
                    <MenuIconImg width={"46px"} className="icon" />
                </ToolTips>
            </div>
            <div className="children" ref={childrenRef}>
                {children}
            </div>
            <div className="footer" ref={footerRef}>
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
                <Cloud1Img width="100%" className="cloud-white" />
                <div className="balance-box" onClick={() => navigate(PageKey.Pay)}>
                    {!isPayPage && (
                        <TText fontSize="24px" className="recharge">
                            充值
                        </TText>
                    )}
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
            </div>
        </PageLayoutWrapper>
    );
}
