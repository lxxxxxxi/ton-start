import { useEffect, useState } from "react";
import { AccountCenterWrapper } from "./styled";
import { TButton } from "../../components/TButton";
import { TBox } from "../../components/TBox";
import { DollarSign, List, Play, RefreshCw, Upload } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../states/useUserInfo";
import {
    getAccountList,
    getBalance,
    loginByTelegram,
    getTgProfile,
    getRechargeList,
    getWithdrawList,
} from "../../request/requests";
import { useAsyncRequest } from "../../hooks/useAsyncRequest";

export default function AccountCenter() {
    const navigate = useNavigate();
    const { user, updateUserInfo } = useUserInfo();

    // fetch data
    const { data: tgProfile } = useAsyncRequest(getTgProfile, [], updateUserInfo);
    const { data: balance, execute: fetchBalance } = useAsyncRequest(getBalance, []);
    const { data: accountList } = useAsyncRequest(getAccountList, []);
    const { data: rechargeList } = useAsyncRequest(getRechargeList, []);
    const { data: withdrawList } = useAsyncRequest(getWithdrawList, []);

    return (
        <AccountCenterWrapper>
            {/* {<button onClick={login}> login by telegram </button>} */}
            {/* <button
                onClick={() => {
                    openAlert("test alert", "info");
                }}
            >
                test alert
            </button> */}

            {!user ? (
                <>Please Login By Telegram First</>
            ) : (
                <div className="user-profile">
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

                    <TBox className="balance-info">
                        <div className="balance">
                            人民币余额 (￥): {balance?.balance}{" "}
                            <RefreshCw
                                onClick={fetchBalance}
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
                            {/* className="selected" */}
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
                </div>
            )}
        </AccountCenterWrapper>
    );
}
