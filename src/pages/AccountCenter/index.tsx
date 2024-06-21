import React from "react";
import { AccountCenterWrapper } from "./styled";
import { TButton } from "../../components/TButton";
import TelegramLoginButton, { TelegramUser } from "./TelegramLoginButton";
import { TBox } from "../../components/TBox";
import { DollarSign, List, Play, Upload } from "react-feather";
import { useNavigate } from "react-router-dom";

export default function AccountCenter() {
    const navigate = useNavigate();

    const dataOnauth = (user: TelegramUser) => {
        console.log("user", user);
    };
    return (
        <AccountCenterWrapper>
            <TelegramLoginButton
                botName={"twastarttest_bot"}
                // dataAuthUrl={"https://lxiiiixi.github.io/ton-start/"}
                dataAuthUrl={"https://a35d-14-154-22-248.ngrok-free.app/"}
                dataOnauth={dataOnauth}
                usePic={true}
                cornerRadius={10}
            />
            <div className="user-profile">
                <div className="profile-header">
                    <div className="avatar">头像</div>
                    <div className="user-info">
                        <h2>Hi, sam</h2>
                        <p>ID: 55278973</p>
                    </div>
                </div>
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
