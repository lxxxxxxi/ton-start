import { AccountCenterWrapper } from "./styled";
import { TButton } from "../../components/Common/TButton";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../states/useUserInfo";
import { getTgProfile } from "../../request/requests";
import { useAsyncRequest } from "../../hooks/useAsyncRequest";
import PageLayout from "@/components/Layouts/PageLayout";
import { CasinoIcon1Img, LottoGirIcon2Img, LottoGirlIcon1Img, CasinoIcon2Img } from "@/assets/imgs";
import { PageKey } from "@/utils/routes";
import { TelegramUser } from "./TelegramLoginButton";
import { useAlertState } from "@/states/useAlertState";
import { getTeleUserName } from "@/utils/tele";

export default function AccountCenter() {
    const navigate = useNavigate();
    const { user, updateUserInfo } = useUserInfo();

    const getTgProfileCallback = (data: TelegramUser) => {
        if (data.id) {
            updateUserInfo(data);
        } else {
            navigate(PageKey.Login);
        }
    };
    useAsyncRequest(getTgProfile, [], getTgProfileCallback);

    getTeleUserName();

    return (
        <PageLayout header="个人中心" isNeedStartButton>
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
                            {/* <span
                                className="text text0"
                                onClick={() => navigate(PageKey.PayHistory)}
                            >
                                充值记录
                            </span> */}
                            <CasinoIcon1Img width="40px" />
                            <span
                                className="text text1"
                                onClick={() => navigate(PageKey.BettingList)}
                            >
                                {/* 去充值 */}
                                投注记录
                            </span>
                        </div>
                        <div className="list">
                            <LottoGirlIcon1Img width="90px" />
                            {/* <span
                                className="text text0"
                                onClick={() => navigate(PageKey.WithdrawHistory)}
                            >
                                提现记录
                            </span> */}
                            <CasinoIcon2Img width="40px" />
                            <span
                                className="text text1"
                                onClick={() => navigate(PageKey.AccountList)}
                            >
                                {/* 去提现 */}
                                账户明细
                            </span>
                        </div>
                    </div>
                </div>
            </AccountCenterWrapper>
        </PageLayout>
    );
}
