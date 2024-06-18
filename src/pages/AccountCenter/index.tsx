import React from "react";
import { AccountCenterWrapper } from "./styled";
import { TButton } from "../../components/TButton";
import TelegramLoginButton from "./TelegramLoginButton";

export default function AccountCenter() {
    return (
        <AccountCenterWrapper>
            <TelegramLoginButton
                botName={"twastarttest_bot"}
                dataAuthUrl={"https://lxiiiixi.github.io/ton-start/"}
            />
            <div className="user-profile">
                <div className="profile-header">
                    <div className="avatar">头像</div>
                    <div className="user-info">
                        <h2>Hi, sam</h2>
                        <p>ID: 55278973</p>
                    </div>
                </div>
                <div className="balance-info">
                    <p>人民币余额 (￥): 22,234.00</p>
                    <div className="actions">
                        <TButton>充值</TButton>
                        <TButton>提现</TButton>
                    </div>
                </div>
                <div className="menu">
                    <ul>
                        <li>开始游戏</li>
                        <li className="selected">充值记录</li>
                        <li>提现记录</li>
                        <li>投注明细</li>
                    </ul>
                </div>
            </div>
        </AccountCenterWrapper>
    );
}
