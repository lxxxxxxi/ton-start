import React, { useState } from "react";
import styled from "styled-components";
import TInput from "../../components/TInput";
import { TButton } from "../../components/TButton";
import AppWrapper from "../../components/AppWrapper";
import { TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useFaucetJettonContract } from "../../hooks/useFaucetJettonContract";
import { USDT_MASTER_ADDRESS } from "../../utils/constant";
import { Jetton } from "../../components/Jetton";
import { Counter } from "../../components/Counter";
import TNumberInput from "../../components/TNumberInput";
import { createRechargeOrder } from "../../request/requests";
import { Address, beginCell, toNano } from "ton-core";

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
    const { jettonWalletAddress } = useFaucetJettonContract(USDT_MASTER_ADDRESS);

    const [tonConnectUI, setOptions] = useTonConnectUI();

    console.log("wallet", jettonWalletAddress, wallet);

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

    // 现在现有的地址：
    // jetton 的 master 地址（仅用来获取用户对应的 wallet 地址）
    // 用户钱包地址
    // 用户的 jetton 钱包地址
    // 接收 USDT 的钱包地址

    // https://docs.ton.org/develop/dapps/ton-connect/message-builders

    const handleTransfer = () => {
        // const Wallet_DST = "UQDONG1SdxnSvJjJKVzkGQCuEkCl31GX91jboZOmmpaUa_uk";
        // const Wallet_SRC = wallet?.account?.address?.toString() || "";
        const TRANSFER = 0xf8a7ea5; // transfer operation code
        const destinationAddress = Address.parse(
            "UQDONG1SdxnSvJjJKVzkGQCuEkCl31GX91jboZOmmpaUa_uk"
        );

        if (!jettonWalletAddress) return;

        const forwardPayload = beginCell()
            .storeUint(0, 32) // 0 opcode means we have a comment
            .storeStringTail("Hello, TON!")
            .endCell();

        // https://github.com/ton-blockchain/TEPs/blob/master/text/0074-jettons-standard.md#1-transfer
        const body = beginCell()
            .storeUint(TRANSFER, 32) // jetton 转账操作码
            .storeUint(0, 64) // query_id:uint64
            .storeCoins(1000000000000) // amount:(VarUInteger 16) -  转账的 Jetton 金额（小数位 = 6 - jUSDT, 9 - 默认）
            .storeAddress(destinationAddress) // destination:MsgAddress
            .storeAddress(destinationAddress) // response_destination:MsgAddress
            .storeBit(0)
            .storeCoins(toNano("0.02")) // forward amount (if >0, will send notification message)
            .storeBit(1) // we store forwardPayload as a reference
            .storeRef(forwardPayload)
            .endCell();
        // .storeUint(0, 1) // custom_payload:(Maybe ^Cell)
        // .storeCoins(toNano("0.1")) // forward_ton_amount:(VarUInteger 16)
        // .storeUint(0, 1) // forward_payload:(Either Cell ^Cell)
        // .storeStringTail("comment")
        // .endCell();
        const myTransaction = {
            validUntil: Math.floor(Date.now() / 1000) + 360,
            messages: [
                {
                    address: jettonWalletAddress,
                    amount: toNano("0.1").toString(),
                    payload: body.toBoc().toString("base64"), // body中带有评论的载荷
                },
            ],
        };
        tonConnectUI.sendTransaction(myTransaction);
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
                <TButton onClick={handleTransfer}>transfer</TButton>
                <Jetton />
                {/* <Counter /> */}
            </PayWrapper>
        </AppWrapper>
    );
}
