import { useEffect, useState } from "react";
import { AccountCenterWrapper } from "./styled";
import { TButton } from "../../components/Common/TButton";
import { TBox } from "../../components/Common/TBox";
import { DollarSign, List, Play, RefreshCw, Upload } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useBalance, useUserInfo } from "../../states/useUserInfo";
import {
    getAccountList,
    getBalance,
    loginByTelegram,
    getTgProfile,
    getRechargeList,
    getWithdrawList,
} from "../../request/requests";
import { useAsyncRequest } from "../../hooks/useAsyncRequest";
import TLoader from "../../components/Common/TLoader";
import PageLayout from "@/components/Layouts/PageLayout";

export default function AccountCenter() {
    const navigate = useNavigate();
    const { user, updateUserInfo } = useUserInfo();
    const { balance, loading: isLoadingBalance, fetchAndUpdateUserBalance } = useBalance();

    // fetch data
    useAsyncRequest(getTgProfile, [], updateUserInfo);
    const { data: accountList } = useAsyncRequest(getAccountList, []);
    console.log(window.Telegram.WebApp.initData);

    return (
        <PageLayout header="AccountCenter">
            <AccountCenterWrapper>
                {/* <div className="user-profile">
                    {!user ? (
                        <>
                            Please Login By Telegram First
                            <button onClick={() => navigate("/login")}>login</button>{" "}
                            <button onClick={() => fetchAndUpdateUserBalance()}>getBalance</button>{" "}
                        </>
                    ) : (
                        <div className="profile-header">
                            <div className="avatar">
                                <img src={user.photo_url} width={"100%"} />
                            </div>
                            <div className="user-info">
                                <h2>
                                    Hi, {user.first_name} {user.last_name}
                                </h2>
                                <p>ID: {user.id}</p>
                            </div>
                        </div>
                    )}
                    <TBox className="balance-info">
                        <div className="balance">
                            人民币余额 (￥): {isLoadingBalance ? <TLoader /> : balance || 0}
                            <RefreshCw
                                onClick={fetchAndUpdateUserBalance}
                                width={16}
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                        <div className="actions">
                            <TButton
                                onClick={() => {
                                    navigate("/pay");
                                }}
                            >
                                充值
                            </TButton>
                            <TButton
                                onClick={() => {
                                    navigate("/withdraw");
                                }}
                            >
                                提现
                            </TButton>
                        </div>
                    </TBox>
                    <TBox className="menu">
                        <ul>
                            <li onClick={() => navigate("/gamelist")}>
                                <Play width={18} /> 开始游戏
                            </li>
                            <li onClick={() => navigate("/pay/history")}>
                                <DollarSign width={18} /> 充值记录
                            </li>
                            <li onClick={() => navigate("/withdraw/history")}>
                                <Upload width={18} /> 提现记录
                            </li>
                            <li onClick={() => navigate("/bettinglist")}>
                                <List width={18} /> 投注明细
                            </li>
                        </ul>
                    </TBox>
                </div> */}
            </AccountCenterWrapper>
        </PageLayout>
    );
}
