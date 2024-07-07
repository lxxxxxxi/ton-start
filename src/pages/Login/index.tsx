import React, { useEffect } from "react";
import styled from "styled-components";
import TelegramLoginButton, { TelegramUser } from "../AccountCenter/TelegramLoginButton";
import { loginByTelegramAuthData, loginByTelegram, getTgProfile } from "../../request/requests";
import { PageKey, useNavigateTo } from "../../utils/routes";
import { TELE, TELE_MAINBUTTON } from "@/utils/tele";
import {
    Cloud1Img,
    Cloud2Img,
    LoginBannerImg,
    ShiningBgImg,
    StartButtonImg,
    StartButtonPressedImg,
    StartImg,
} from "@/assets/imgs";
import PageLayout from "@/components/Layouts/PageLayout";
import { PageLayoutWrapper } from "@/components/Layouts/styled";

export default function Login() {
    const navigate = useNavigateTo();

    // useEffect(() => {
    //     alert(window.Telegram.WebApp.viewportStableHeight);
    // }, []);

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
        getTgProfile().then(res => {
            console.log(res);
            if (res.status === 200) {
                navigate(PageKey.AccountCenter);
            } else {
                const initData = TELE.initData;
                if (!initData) {
                    console.error("initData is null");
                } else {
                    loginByTelegramAuthData(initData)
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
                }
            }
        });
    };

    return (
        <PageLayoutWrapper shouldChildUnderCloud={false} isNeedStartButton>
            <div className="login-banner">
                <LoginBannerImg width="280px" />
                <div className="shadow"></div>
            </div>
            <div className="button-wrapper">
                <StartButtonImg width="200px" className="start-button" />
                <StartButtonPressedImg width="200px" className="start-button-pressed" />
                <div className="start-text" onClick={handleLogin}>
                    START
                </div>
            </div>
            <Cloud1Img width="110%" className="cloud-white" />
            <Cloud2Img width="110%" className="cloud-green" />
        </PageLayoutWrapper>
    );
}

{
    /* <TelegramLoginButton
botName={"twastarttest_bot"}
dataOnauth={dataOnauth}
usePic={true}
cornerRadius={10}
/> */
}
