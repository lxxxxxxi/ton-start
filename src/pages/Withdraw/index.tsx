import React, { useState } from "react";
import styled from "styled-components";
import TInput from "../../components/Common/TInput";
import { TButton } from "../../components/Common/TButton";
import AppWrapper from "../../components/AppWrapper";
import ExchangeRate from "../Pay/ExchangeRate";
import TNumberInput from "../../components/Common/TNumberInput";
import { createWithdrawOrder } from "../../request/requests";
import { USDT_MASTER_ADDRESS } from "../../utils/constant";
import { useFaucetJettonContract } from "../../hooks/useFaucetJettonContract";
import { useBalance } from "../../states/useUserInfo";
import { formatPrice } from "../../utils/format";
import PageLayout from "@/components/Layouts/PageLayout";
import { CoinWrapper } from "@/components/styled/styled";
import { PayWrapper } from "../Pay";
import { Jetton } from "@/components/Jetton";

export default function Withdraw() {
    const [amount, setAmount] = useState(10);
    const { jettonWalletAddress } = useFaucetJettonContract(USDT_MASTER_ADDRESS);
    const { balance } = useBalance();

    const handleComfirm = () => {
        console.log(jettonWalletAddress, amount);
        if (!jettonWalletAddress || !amount || amount < 10) return;
        const orderData = {
            address: jettonWalletAddress,
            amount,
        };
        createWithdrawOrder(orderData).then(res => {
            console.log(res);
        });
    };

    return (
        <PageLayout header={"提现"}>
            <PayWrapper>
                <Jetton />
                <div className="input">
                    <div className="header">
                        <span>账户余额 {balance ? formatPrice(balance) : 0}</span>
                        <a href="#">提现记录</a>
                    </div>
                    <div>
                        {/* <span>还需投注100才能提现</span> */}
                        <TNumberInput
                            minNumber={10}
                            maxNumber={10000}
                            prefix={<CoinWrapper>¥</CoinWrapper>}
                            placeholder="最低10，最高10000"
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
