import React, { useEffect, useState } from "react";
import { AccountCenterWrapper } from "./styled";
import { TButton } from "../../components/TButton";
import TelegramLoginButton, { TelegramUser } from "./TelegramLoginButton";
import { TBox } from "../../components/TBox";
import { DollarSign, List, Play, RefreshCw, Upload } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../states/useUserInfo";
import { getAccountList, getBalance, loginByTelegram } from "../../request/requests";
import { useAlertState } from "../../states/useAlertState";

export default function AccountCenter() {
    const navigate = useNavigate();
    const { user, updateUserInfo } = useUserInfo();

    const [balance, setBalance] = useState(0);
    const [accountList, setAccountList] = useState([]);
    const { openAlert } = useAlertState();

    console.log(user);

    const fetchBalance = async () => {
        try {
            const response = await getBalance();
            setBalance(response.data);
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    useEffect(() => {
        const fetchAccountList = async () => {
            try {
                const response = await getAccountList();
                setAccountList(response.data);
            } catch (error) {
                console.error("Error fetching account list:", error);
            }
        };

        fetchBalance();
        fetchAccountList();
    }, []);

    const login = () => {
        if (!user) {
            throw new Error("Please login by telegram first");
        }
        loginByTelegram(user)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    const result = res.data;
                    if (result.access_token)
                        localStorage.setItem("access_token", result.access_token);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const dataOnauth = (user: TelegramUser) => {
        if (user) {
            console.log("update user info", user);
            updateUserInfo(user);
            login();
        }
    };

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
            <TelegramLoginButton
                botName={"twastarttest_bot"}
                // dataAuthUrl={"https://5c90-223-104-77-187.ngrok-free.app"}
                dataOnauth={dataOnauth}
                // dataAuthUrl="http://47.115.201.164:8080/api/v1/auth/tg_login/"
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
                    <div className="balance">
                        人民币余额 (￥): {balance}{" "}
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
        </AccountCenterWrapper>
    );
}
