import { AccountCenterWrapper } from "./styled";
import { Button, TButton } from "../../components/Common/TButton";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../states/useUserInfo";
import { getTgProfile } from "../../request/requests";
import { useAsyncRequest } from "../../hooks/useAsyncRequest";
import PageLayout from "@/components/Layouts/PageLayout";
import { LottoGirIcon2Img, LottoGirlIcon1Img } from "@/assets/imgs";
import { PageKey } from "@/utils/routes";
import { TelegramUser } from "./TelegramLoginButton";
import { useAlertState } from "@/states/useAlertState";

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

    const { openAlert } = useAlertState();

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

                    <div className="actions">
                        <div className="list">
                            <LottoGirIcon2Img width="100px" />
                            <span
                                className="text text0"
                                onClick={() => navigate(PageKey.PayHistory)}
                            >
                                充值记录
                            </span>
                            <span className="text text1" onClick={() => navigate(PageKey.Pay)}>
                                去充值
                            </span>
                        </div>
                        <div className="list">
                            <LottoGirlIcon1Img width="100px" />
                            <span
                                className="text text0"
                                onClick={() => navigate(PageKey.WithdrawHistory)}
                            >
                                提现记录
                            </span>
                            <span className="text text1" onClick={() => navigate(PageKey.Withdraw)}>
                                去提现
                            </span>
                        </div>
                    </div>
                </div>
            </AccountCenterWrapper>
        </PageLayout>
    );
}
