import React, { useState } from "react";
import styled from "styled-components";
import { TButton } from "../../components/Common/TButton";
import AppWrapper from "../../components/AppWrapper";
import ExchangeRate from "../Pay/ExchangeRate";
import TNumberInput from "../../components/Common/TNumberInput";
import { createWithdrawOrder, getAccountRemainBetAmount } from "../../request/requests";
import { USDT_MASTER_ADDRESS, WITHDRAW_MIN } from "../../utils/constant";
import { useFaucetJettonContract } from "../../hooks/useFaucetJettonContract";
import { useBalance } from "../../states/useUserInfo";
import { formatPrice } from "../../utils/format";
import PageLayout from "@/components/Layouts/PageLayout";
import { CoinWrapper } from "@/components/styled/styled";
import { PayWrapper } from "../Pay";
import { Jetton } from "@/components/Jetton";
import { PageKey, useNavigateTo } from "@/utils/routes";
import { useAlertState } from "@/states/useAlertState";
import { useModalState } from "@/states/useModalState";
import { useAsyncRequest } from "@/hooks/useAsyncRequest";
import TText from "@/components/Common/TText";

export default function Withdraw() {
    const [amount, setAmount] = useState(10);
    const { jettonWalletAddress } = useFaucetJettonContract(USDT_MASTER_ADDRESS);
    const { balance } = useBalance();
    const navigate = useNavigateTo();
    const { openAlert } = useAlertState();
    const { openSuccessModal } = useModalState();

    const { data: remain_bet_amount } = useAsyncRequest(getAccountRemainBetAmount, []);

    const handleComfirm = () => {
        console.log(jettonWalletAddress, amount);
        if (!jettonWalletAddress) {
            openAlert("warning", "钱包地址无效", "请先连接钱包");
            return;
        }
        if (!amount || amount < WITHDRAW_MIN) {
            openAlert("warning", "金额无效", "请输入有效的提现金额");
            return;
        }
        const insufficientBalance = balance !== null && amount > balance;
        if (insufficientBalance) {
            openAlert("warning", "余额不足", "可用余额不足");
            return;
        }
        const enoughBetAmount = remain_bet_amount && remain_bet_amount !== 0;
        if (enoughBetAmount) {
            openAlert(
                "warning",
                "不满足提现金额",
                `还需投注${formatPrice(remain_bet_amount)}才能提现`
            );
            return;
        }
        const orderData = {
            address: jettonWalletAddress,
            amount,
        };
        createWithdrawOrder(orderData).then(res => {
            console.log(res);
            // openAlert("success", "交易提交", "交易提交成功，管理员确认余额后即会更新。");
            openSuccessModal(
                "提现申请提交成功!!!",
                <div>
                    <div>管理员将尽快完成审核并打款。</div>
                    <div>如遇问题，请联系客服。</div>
                </div>
            );
        });
    };

    return (
        <PageLayout header={"提现"}>
            <PayWrapper>
                <Jetton />
                <div className="input">
                    <div className="header">
                        {remain_bet_amount ? (
                            <span>
                                还需投注{" "}
                                <TText color="info" style={{ display: "inline" }}>
                                    {formatPrice(remain_bet_amount)}{" "}
                                </TText>
                                才能提现
                            </span>
                        ) : (
                            <span>余额:{formatPrice(balance || 0)}</span>
                        )}

                        <a onClick={() => navigate(PageKey.WithdrawHistory)}>提现记录</a>
                    </div>
                    <div>
                        {/* <span>还需投注100才能提现</span> */}
                        <TNumberInput
                            minNumber={10}
                            maxNumber={10000}
                            prefix={<CoinWrapper>¥</CoinWrapper>}
                            value={amount}
                            handleValueChange={value => setAmount(value)}
                        />
                    </div>
                    <div style={{ padding: "0px 5px" }}>
                        <ExchangeRate amount={amount} />
                    </div>
                </div>
                <TButton onClick={handleComfirm}>确定</TButton>
            </PayWrapper>
        </PageLayout>
    );
}
