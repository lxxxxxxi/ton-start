import React from "react";
import { AccountCenterWrapper } from "./styled";
import { TButton } from "../../components/TButton";
import TelegramLoginButton, { TelegramUser } from "./TelegramLoginButton";
import { TBox } from "../../components/TBox";
import { DollarSign, List, Play, Upload } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../states/useUserInfo";

export default function AccountCenter() {
    const navigate = useNavigate();
    const { user, updateUserInfo } = useUserInfo();

    console.log(user);

    const dataOnauth = (user: TelegramUser) => {
        if (user) {
            console.log("update user info", user);
            updateUserInfo(user);
        }
    };

    return (
        <AccountCenterWrapper>
            <TelegramLoginButton
                botName={"twastarttest_bot"}
                // dataAuthUrl={"https://lxiiiixi.github.io/ton-start/"}
                // dataAuthUrl={"https://5c90-223-104-77-187.ngrok-free.app"}
                dataOnauth={dataOnauth}
                usePic={true}
                cornerRadius={10}
            />
            <div className="user-profile">
                {user && (
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
                    <p>人民币余额 (￥): 22,234.00</p>
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
                        <li className="selected" onClick={() => navigate("/pay/history")}>
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
        </AccountCenterWrapper>
    );
}
