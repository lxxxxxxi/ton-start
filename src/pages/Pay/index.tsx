import React, { useState } from "react";
import styled from "styled-components";
import TInput from "../../components/TInput";
import { TButton } from "../../components/TButton";
import AppWrapper from "../../components/AppWrapper";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { useFaucetJettonContract } from "../../hooks/useFaucetJettonContract";
import { USDT_ADDRESS } from "../../utils/constant";
import { Jetton } from "../../components/Jetton";
import { Counter } from "../../components/Counter";
import TNumberInput from "../../components/TNumberInput";
import { createRechargeOrder } from "../../request/requests";

const PayWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    border-radius: 8px;
    padding: 20px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        a {
            color: #0066cc;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
    }

    .rate {
        color: #666;
    }

    .ton-button {
        display: flex;
        justify-content: center;
    }
`;

export default function Pay() {
    const wallet = useTonWallet();
    // const { balance } = useFaucetJettonContract(USDT_ADDRESS);
    // console.log(balance);
    const [amount, setAmount] = useState(0);
    const [order, setOrder] = useState<{ amount: number; order_no: string } | null>(null);

    console.log("wallet", wallet);

    const handleRecharge = () => {
        console.log(amount);
        if (amount >= 10 && amount < 10000) {
            createRechargeOrder({ amount })
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        setOrder(res.data);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            console.log("金额无效");
        }
    };

    return (
        <AppWrapper title="充值">
            <PayWrapper>
                <div className="header">
                    <span>充值金额</span>
                    <a href="#">充值记录</a>
                </div>
                <TNumberInput
                    minNumber={10}
                    maxNumber={10000}
                    prefix="U"
                    placeholder="最低10，最高10000"
                    value={amount}
                    handleValueChange={value => setAmount(value)}
                />
                <div className="rate">汇率: 1U = ¥7.38</div>
                <div className="ton-button">
                    <TonConnectButton />
                </div>
                <TButton onClick={handleRecharge}>立即充值</TButton>
                <Jetton />
                {/* <Counter /> */}
            </PayWrapper>
        </AppWrapper>
    );
}
