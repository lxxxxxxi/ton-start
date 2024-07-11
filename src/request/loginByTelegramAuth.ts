import { TELE } from "@/utils/tele";
import { loginByTelegramAuthData } from "./requests";
import { setAccessToken } from "@/utils/accessToken";

export const loginByTelegramAuth = (loginCallback?: () => void) => {
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
                        setAccessToken(result.access_token);
                        if (loginCallback) loginCallback();
                    } else {
                        // 如果无法登陆 => 还是跳转到 login
                        console.log("not get access_token");
                        window.location.href = window.location.origin + "/ton-start/#/";
                        // 如果在登陆页面登录失败呢？
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
};
