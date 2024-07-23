import { TELE } from "@/utils/tele";
import { getBalance, loginByTelegramAuthData, playGame } from "./requests";
import { setAccessToken } from "@/utils/accessToken";
import { TButton } from "@/components/Common/TButton";
import { useModalState } from "@/states/useModalState";
import { PageKey, useNavigateTo } from "@/utils/routes";
import { useGameUrl } from "@/states/useGameUrl";

export const loginByTelegramAuth = (loginCallback?: () => void) => {
    const initData = TELE.initData;
    if (!initData) {
        console.error("initData is null");
        window.location.href = window.location.origin + "/ton-start/#/";
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
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
};

export const useHandlePlayGame = (callback?: (url: string) => void) => {
    const { openGame } = useGameUrl();
    const navigate = useNavigateTo();
    const { openLoadingModal, openErrorModal, closeModal } = useModalState();

    const hanldePlayGame = (code: string, gamecode: string, gametype: string) => {
        openLoadingModal("加载中....", <div>游戏正在努力加载中，请稍后。</div>, 60000);
        if (code && gamecode && gametype) {
            getBalance().then(r => {
                console.log(r.data.balance);
                const balance = r.data.balance;
                if (balance > 5) {
                    playGame(code, gamecode, gametype)
                        .then(res => {
                            const url = res.data.url;
                            console.log(url);
                            if (url) {
                                if (callback) callback(url);
                                openGame(url);
                                // window.open(url);
                                closeModal();
                            } else {
                                openErrorModal("游戏加载异常", <div>请联系 TG 管理员</div>);
                                navigate(PageKey.GameList);
                            }
                        })
                        .catch(err => {
                            closeModal();
                            navigate(PageKey.GameList);
                        });
                } else {
                    openErrorModal(
                        "余额不足",
                        <TButton size="small" onClick={() => navigate(PageKey.Pay)}>
                            去充值
                        </TButton>
                    );
                }
            });
        }
    };

    return hanldePlayGame;
};
