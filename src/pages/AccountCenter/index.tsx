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
import { LottoGirIcon2Img, LottoGirlIcon1Img } from "@/assets/imgs";
import { PageKey } from "@/utils/routes";

export default function AccountCenter() {
    const navigate = useNavigate();
    const { user, updateUserInfo } = useUserInfo();

    console.log(user);

    // fetch data
    useAsyncRequest(getTgProfile, [], updateUserInfo);
    const { data: accountList } = useAsyncRequest(getAccountList, []);

    return (
        <PageLayout header="个人中心" isNeedStartButton>
            <AccountCenterWrapper>
                <div className="user-profile">
                    {!user ? (
                        <div className="profile-header">
                            <div className="avatar"></div>
                            <div className="user-info"></div>
                        </div>
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

                    <div className="actions">
                        <div className="list">
                            <LottoGirIcon2Img width="100px" />
                            <span
                                className="text text0"
                                onClick={() => navigate(PageKey.PayHistory)}
                            >
                                充值记录
                            </span>
                            <span className="text text1" onClick={() => navigate(PageKey.Pay)}>
                                去充值
                            </span>
                        </div>
                        <div className="list">
                            <LottoGirlIcon1Img width="100px" />
                            <span
                                className="text text0"
                                onClick={() => navigate(PageKey.WithdrawHistory)}
                            >
                                提现记录
                            </span>
                            <span className="text text1" onClick={() => navigate(PageKey.Withdraw)}>
                                去提现
                            </span>
                        </div>
                        {/* <TButton
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
                        </TButton> */}
                    </div>
                    {/* <TBox className="menu">
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
                    </TBox> */}
                </div>
            </AccountCenterWrapper>
        </PageLayout>
    );
}
