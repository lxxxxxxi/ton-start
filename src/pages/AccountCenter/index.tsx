import { AccountCenterWrapper } from "./styled";
import { TButton } from "../../components/Common/TButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserInfo } from "../../states/useUserInfo";
import { getGameList, getTgProfile } from "../../request/requests";
import { useAsyncRequest } from "../../hooks/useAsyncRequest";
import PageLayout from "@/components/Layouts/PageLayout";
import { CasinoIcon1Img, LottoGirIcon2Img, LottoGirlIcon1Img, CasinoIcon2Img } from "@/assets/imgs";
import { PageKey, useNavigateTo } from "@/utils/routes";
import { TelegramUser } from "./TelegramLoginButton";
import { GameListItem } from "@/utils/interface";
import { useEffect, useState } from "react";
import { useHandlePlayGame } from "@/request/loginByTelegramAuth";

export default function AccountCenter() {
    const navigate = useNavigateTo();
    const { user, updateUserInfo } = useUserInfo();
    const [game, setGame] = useState<GameListItem>();
    const [searchParams] = useSearchParams();

    const code = searchParams.get("code");
    const gamecode = searchParams.get("gamecode");
    const gametype = searchParams.get("gametype");

    const getTgProfileCallback = (data: TelegramUser) => {
        if (data.id) {
            updateUserInfo(data);
        } else {
            navigate(PageKey.Login);
        }
    };
    useAsyncRequest(getTgProfile, [], getTgProfileCallback);

    const hanldePlayGame = useHandlePlayGame();

    const { data: gameList } = useAsyncRequest<GameListItem[]>(() => getGameList(), []);

    useEffect(() => {
        if (code && gamecode && gametype && gameList) {
            const game = gameList.find(
                item =>
                    item.code === code && item.gamecode === gamecode && item.gametype === gametype
            );
            if (game) {
                setGame(game);
            }
        }
    }, [gameList]);

    return (
        <PageLayout
            header="我的"
            isNeedStartButton
            handlePlay={() => {
                if (game) {
                    console.log(game);
                    hanldePlayGame(game.code, game.gamecode, game.gametype);
                } else {
                    navigate(PageKey.GameList);
                }
            }}
        >
            <AccountCenterWrapper>
                <div className="user-profile">
                    {!user ? (
                        <div className="profile-header">
                            {/* <div className="avatar"></div> */}
                            {/* <div className="user-info"></div> */}
                            <TButton onClick={() => navigate(PageKey.Login)}>Login</TButton>
                        </div>
                    ) : (
                        <div className="profile-header">
                            {!!user.photo_url && (
                                <div className="avatar">
                                    <img src={user.photo_url} width={"100%"} />
                                </div>
                            )}
                            <div className="user-info">
                                <h2>
                                    Hi, {user.first_name} {user.last_name}
                                </h2>
                                <p>ID: {user.id}</p>
                            </div>
                        </div>
                    )}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "8px",
                            margin: "4px",
                        }}
                    >
                        <TButton
                            size="small"
                            type="secondary"
                            onClick={() => navigate(PageKey.Withdraw)}
                        >
                            去提现
                        </TButton>
                        <TButton size="small" onClick={() => navigate(PageKey.Pay)}>
                            去充值
                        </TButton>
                    </div>

                    <div className="actions">
                        <div className="list">
                            <LottoGirIcon2Img width="90px" />
                            <CasinoIcon1Img width="40px" />
                            <span
                                className="text text1"
                                onClick={() => navigate(PageKey.BettingList)}
                            >
                                投注记录
                            </span>
                        </div>
                        <div className="list">
                            <LottoGirlIcon1Img width="90px" />
                            <CasinoIcon2Img width="40px" />
                            <span
                                className="text text1"
                                onClick={() => navigate(PageKey.AccountList)}
                            >
                                账户明细
                            </span>
                        </div>
                    </div>
                </div>
            </AccountCenterWrapper>
        </PageLayout>
    );
}
