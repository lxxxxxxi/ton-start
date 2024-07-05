import React, { useEffect } from "react";
import styled from "styled-components";
import TelegramLoginButton, { TelegramUser } from "../AccountCenter/TelegramLoginButton";
import { loginByTelegramAuthData, loginByTelegram } from "../../request/requests";
import { PageKey, useNavigateTo } from "../../utils/routes";
import { TELE, TELE_MAINBUTTON } from "@/utils/tele";
import { CoinIcon1, CoinIcon1Img } from "@/assets/imgs";

const Wrapper = styled.div`
    width: 100%;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default function Login() {
    const navigate = useNavigateTo();

    useEffect(() => {
        // TELE.ready();
    }, []);

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

    console.log(window.Telegram.WebApp.initData);

    return (
        <Wrapper>
            <CoinIcon1 />
            <CoinIcon1Img width={100} />
            <button onClick={() => loginByTelegramAuthData(window.Telegram.WebApp.initData)}>
                login
            </button>
            <button
                onClick={() => {
                    TELE_MAINBUTTON.show();
                }}
            >
                test
            </button>

            <TelegramLoginButton
                botName={"twastarttest_bot"}
                // dataAuthUrl={"https://5c90-223-104-77-187.ngrok-free.app"}
                dataOnauth={dataOnauth}
                // dataAuthUrl="http://47.115.201.164:8080/api/v1/auth/tg_login/"
                usePic={true}
                cornerRadius={10}
            />
        </Wrapper>
    );
}
