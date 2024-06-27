import React from "react";
import styled from "styled-components";
import TelegramLoginButton, { TelegramUser } from "../AccountCenter/TelegramLoginButton";
import { loginByTelegram } from "../../request/requests";

const Wrapper = styled.div`
    /* width: 100vw;
    height: 80vh; */
    width: 100%;
    height: 100%;
    background-color: pink;
    height: 500px;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default function Login() {
    const login = (user: TelegramUser) => {
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
            login(user);
        }
    };

    return (
        <Wrapper>
            123
            {/* <TelegramLoginButton
                    botName={"twastarttest_bot"}
                    // dataAuthUrl={"https://5c90-223-104-77-187.ngrok-free.app"}
                    dataOnauth={dataOnauth}
                    // dataAuthUrl="http://47.115.201.164:8080/api/v1/auth/tg_login/"
                    usePic={true}
                    cornerRadius={10}
                /> */}
        </Wrapper>
    );
}
