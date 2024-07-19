import AccountCenter from "../pages/AccountCenter";
import GameList from "../pages/GameList";
import Pay from "../pages/Pay";
import Withdraw from "../pages/Withdraw";
import Login from "../pages/Login";
import BettingList from "../pages/BettingList";
import PayHistory from "../pages/PayHistory";
import WithdrawHistory from "../pages/WithdrawHistory";
import { useNavigate } from "react-router-dom";
import AccountList from "@/pages/AccountList";
import GameDetails from "@/pages/Game";

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
}

export const routes = [
    {
        key: PageKey.AccountCenter,
        path: "/account",
        component: <AccountCenter />,
    },
    {
        key: PageKey.Login,
        path: "/",
        component: <Login />,
    },
    {
        key: PageKey.GameList,
        path: "/gamelist",
        component: <GameList />,
    },
    {
        key: PageKey.Game,
        path: "/game",
        component: <GameDetails />,
    },
    {
        key: PageKey.AccountList,
        path: "/accountlist",
        component: <AccountList />,
    },
    {
        key: PageKey.Pay,
        path: "/pay",
        component: <Pay />,
    },
    {
        key: PageKey.Withdraw,
        path: "/withdraw",
        component: <Withdraw />,
    },
    {
        key: PageKey.BettingList,
        path: "/bettinglist",
        component: <BettingList />,
    },
    {
        key: PageKey.PayHistory,
        path: "/pay/history",
        component: <PayHistory />,
    },
    {
        key: PageKey.WithdrawHistory,
        path: "/withdraw/history",
        component: <WithdrawHistory />,
    },
];

export const useNavigateTo = () => {
    const navigate = useNavigate();
    const navigateTo = (path: PageKey) => {
        navigate(path);
    };
    return navigateTo;
};
