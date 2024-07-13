import React, { useCallback, useEffect } from "react";
import { getTgProfile } from "../../request/requests";
import { PageKey, useNavigateTo } from "../../utils/routes";
import { Cloud1Img, Cloud2Img, LoginBannerImg } from "@/assets/imgs";
import { PageLayoutWrapper } from "@/components/Layouts/styled";
import { loginByTelegramAuth } from "@/request/loginByTelegramAuth";
import TText from "@/components/Common/TText";
import TBannerText from "@/components/Common/TBannerText";

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
                {/* <LoginBannerImg width="280px" /> */}
                <TBannerText></TBannerText>
                <div className="shadow"></div>
            </div>
            <Cloud1Img width="110%" className="cloud-white" />
            <Cloud2Img width="110%" className="cloud-green" />
        </PageLayoutWrapper>
    );
}
