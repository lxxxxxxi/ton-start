import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import TelegramLoginButton, { TelegramUser } from "../AccountCenter/TelegramLoginButton";
import { loginByTelegramAuthData, loginByTelegram, getTgProfile } from "../../request/requests";
import { PageKey, useNavigateTo } from "../../utils/routes";
import { TELE, TELE_MAINBUTTON } from "@/utils/tele";
import { Cloud1Img, Cloud2Img, LoginBannerImg } from "@/assets/imgs";
import { PageLayoutWrapper } from "@/components/Layouts/styled";

const loginByTelegramAuth = (loginCallback?: () => void) => {
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
                        if (loginCallback) loginCallback();
                    } else {
                        console.log("not get access_token");
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
};

export default function Login() {
    const navigate = useNavigateTo();

    useEffect(() => {
        handleLogin();
    }, []);

    const handleLogin = () => {
        getTgProfile()
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    navigate(PageKey.GameList);
                } else {
                    loginByTelegramAuth(() => navigate(PageKey.GameList));
                }
            })
            .catch(err => {
                const responseStatus = err.response?.status;
                if (responseStatus === 401) {
                    loginByTelegramAuth(() => navigate(PageKey.GameList));
                }
            });
    };

    return (
        <PageLayoutWrapper shouldChildUnderCloud={false} isNeedStartButton>
            <div className="login-banner">
                <LoginBannerImg width="280px" />
                <div className="shadow"></div>
            </div>
            <Cloud1Img width="110%" className="cloud-white" />
            <Cloud2Img width="110%" className="cloud-green" />
        </PageLayoutWrapper>
    );
}
