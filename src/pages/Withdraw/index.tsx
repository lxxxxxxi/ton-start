import React, { useState } from "react";
import styled from "styled-components";
import TInput from "../../components/TInput";
import { TButton } from "../../components/TButton";
import AppWrapper from "../../components/AppWrapper";
import ExchangeRate from "../Pay/ExchangeRate";
import TNumberInput from "../../components/TNumberInput";
import { createWithdrawOrder } from "../../request/requests";
import { USDT_MASTER_ADDRESS } from "../../utils/constant";
import { useFaucetJettonContract } from "../../hooks/useFaucetJettonContract";
import { useBalance } from "../../states/useUserInfo";
import { formatPrice } from "../../utils/format";

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
`;

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
        <AppWrapper title={"提现"} isNeedTonConnectButton>
            <PayWrapper>
                <div className="header">
                    <span>账户余额 {balance ? formatPrice(balance) : 0}</span>
                    <a href="#">提现记录</a>
                </div>
                <div>
                    {/* <span>还需投注100才能提现</span> */}
                    <TNumberInput
                        minNumber={10}
                        maxNumber={10000}
                        prefix="¥"
                        placeholder="最低10，最高10000"
                        value={amount}
                        handleValueChange={value => setAmount(value)}
                    />
                </div>
                <ExchangeRate amount={amount} />
                <TButton onClick={handleComfirm}>确定</TButton>
            </PayWrapper>
        </AppWrapper>
    );
}
