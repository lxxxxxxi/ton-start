import { Dots } from "@/components/Common/TLoadingBar";
import Play from "@/pages/Play";
import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

// 动态导入页面组件
const AccountCenter = lazy(() => import("../pages/AccountCenter"));
const GameList = lazy(() => import("../pages/GameList"));
const Pay = lazy(() => import("../pages/Pay"));
const Withdraw = lazy(() => import("../pages/Withdraw"));
const Login = lazy(() => import("../pages/Login"));
const BettingList = lazy(() => import("../pages/BettingList"));
const PayHistory = lazy(() => import("../pages/PayHistory"));
const WithdrawHistory = lazy(() => import("../pages/WithdrawHistory"));
const AccountList = lazy(() => import("@/pages/AccountList"));
const GameDetails = lazy(() => import("@/pages/Game"));

export enum PageKey {
    AccountCenter = "/account",
    Login = "/",
    GameList = "/gamelist",
    Game = "/game",
    AccountList = "/accountlist",
    Pay = "/pay",
    Withdraw = "/withdraw",
    BettingList = "/bettinglist",
    PayHistory = "/pay/history",
    WithdrawHistory = "/withdraw/history",
    Play = "/play",
}

const Loading = () => (
    <div style={{ textAlign: "center" }}>
        <Dots>Loading</Dots>
    </div>
);

export const routes = [
    {
        key: PageKey.AccountCenter,
        path: "/account",
        component: (
            <Suspense fallback={<Loading />}>
                <AccountCenter />
            </Suspense>
        ),
    },
    {
        key: PageKey.Login,
        path: "/",
        component: (
            <Suspense fallback={<Loading />}>
                <Login />
            </Suspense>
        ),
    },
    {
        key: PageKey.GameList,
        path: "/gamelist",
        component: (
            <Suspense fallback={<Loading />}>
                <GameList />
            </Suspense>
        ),
    },
    {
        key: PageKey.Game,
        path: "/game",
        component: (
            <Suspense fallback={<Loading />}>
                <GameDetails />
            </Suspense>
        ),
    },
    {
        key: PageKey.AccountList,
        path: "/accountlist",
        component: (
            <Suspense fallback={<Loading />}>
                <AccountList />
            </Suspense>
        ),
    },
    {
        key: PageKey.Pay,
        path: "/pay",
        component: (
            <Suspense fallback={<Loading />}>
                <Pay />
            </Suspense>
        ),
    },
    {
        key: PageKey.Withdraw,
        path: "/withdraw",
        component: (
            <Suspense fallback={<Loading />}>
                <Withdraw />
            </Suspense>
        ),
    },
    {
        key: PageKey.BettingList,
        path: "/bettinglist",
        component: (
            <Suspense fallback={<Loading />}>
                <BettingList />
            </Suspense>
        ),
    },
    {
        key: PageKey.PayHistory,
        path: "/pay/history",
        component: (
            <Suspense fallback={<Loading />}>
                <PayHistory />
            </Suspense>
        ),
    },
    {
        key: PageKey.WithdrawHistory,
        path: "/withdraw/history",
        component: (
            <Suspense fallback={<Loading />}>
                <WithdrawHistory />
            </Suspense>
        ),
    },
    {
        key: PageKey.Play,
        path: "/play",
        component: (
            <Suspense fallback={<Loading />}>
                <Play />
            </Suspense>
        ),
    },
];

export const useNavigateTo = () => {
    const navigate = useNavigate();
    const navigateTo = (path: PageKey) => {
        navigate(path);
    };
    return navigateTo;
};
