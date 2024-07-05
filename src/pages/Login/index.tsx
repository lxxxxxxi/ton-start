import React, { useEffect } from "react";
import styled from "styled-components";
import TelegramLoginButton, { TelegramUser } from "../AccountCenter/TelegramLoginButton";
import { loginByTelegramAuthData, loginByTelegram } from "../../request/requests";
import { PageKey, useNavigateTo } from "../../utils/routes";
import { TELE, TELE_MAINBUTTON } from "@/utils/tele";
import {
    Cloud1Img,
    Cloud2Img,
    LoginBannerImg,
    ShiningBgImg,
    StartButtonImg,
    StartImg,
} from "@/assets/imgs";

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;
    overflow: hidden;

    background-color: ${({ theme }) => theme.Colors.Bg2};

    .login-banner {
        text-align: center;

        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);

        .shadow {
            width: 300px;
            height: 36px;
            background-color: #f3ac47;
            opacity: 20%;
            border-radius: 100%;
        }
    }

    .start-button {
        position: absolute;
        bottom: 180px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
    }

    .start-text {
        position: absolute;
        bottom: 285px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 40;
        cursor: pointer;
    }

    .cloud-white {
        position: absolute;
        left: -10%;
        bottom: 0;
        z-index: 12;
    }

    .cloud-green {
        position: absolute;
        left: -10%;
        bottom: 100px;
        z-index: 4;
    }
`;

export default function Login() {
    const navigate = useNavigateTo();

    const login = (user: TelegramUser) => {
        if (!user) {
            throw new Error("Please login by telegram first");
        }
        loginByTelegram(user)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    const result = res.data;
                    if (result.access_token) {
                        localStorage.setItem("access_token", result.access_token);
                        navigate(PageKey.AccountCenter);
                    } else {
                        console.log("not get access_token");
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const dataOnauth = (user: TelegramUser) => {
        if (user) {
            console.log("update user info", user);
            login(user);
        }
    };

    const handleLogin = () => {
        const initData = TELE.initData;
        if (!initData) {
            console.error("initData is null");
        } else {
            loginByTelegramAuthData(initData);
        }
    };

    return (
        <Wrapper>
            {/* <button onClick={() => loginByTelegramAuthData(window.Telegram.WebApp.initData)}>
                login
            </button>
            <TelegramLoginButton
                botName={"twastarttest_bot"}
                dataOnauth={dataOnauth}
                usePic={true}
                cornerRadius={10}
            /> */}
            <div className="login-banner">
                <LoginBannerImg width="280px" />
                <div className="shadow"></div>
            </div>
            <div>
                <StartButtonImg width="250px" className="start-button" />
                <StartImg width="90px" className="start-text" onClick={handleLogin} />
            </div>
            <Cloud1Img width="110%" className="cloud-white" />
            <Cloud2Img width="110%" className="cloud-green" />
        </Wrapper>
    );
}
