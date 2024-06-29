import React, { useState } from "react";
import styled from "styled-components";
import TInput from "../../components/TInput";
import { TButton } from "../../components/TButton";
import AppWrapper from "../../components/AppWrapper";
import {
    TonConnectButton,
    useTonAddress,
    useTonConnectUI,
    useTonWallet,
} from "@tonconnect/ui-react";
import { useFaucetJettonContract } from "../../hooks/useFaucetJettonContract";
import { USDT_MASTER_ADDRESS } from "../../utils/constant";
import { Jetton } from "../../components/Jetton";
import { Counter } from "../../components/Counter";
import TNumberInput from "../../components/TNumberInput";
import { createRechargeOrder, getExchangeRate } from "../../request/requests";
import { Address, beginCell, toNano } from "ton-core";
import { DESTINATION_ADDRESS } from "../../utils/envs";
import { useAlertState } from "../../states/useAlertState";
import type { AlertType } from "../../components/TAlert";
import TonWeb from "tonweb";
import { useAsyncRequest } from "../../hooks/useAsyncRequest";
import BigNumber from "bignumber.js";
import ExchangeRate from "./ExchangeRate";

// {
//     "address": "0:6ed9e9ed8d806f91c9afec2497b70c19d2b5e002f387106b8444877040887ae1",
//     "name": "pg USDT",
//     "symbol": "USDT",
//     "decimals": "9",
//     "image": "https://cache.tonapi.io/imgproxy/cOMlJuViiVXDCkAghnyNj7plX8pAZ9pv3WhklvebpTY/rs:fill:200:200:1/g:no/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3RvbmtlZXBlci9vcGVudG9uYXBpL21hc3Rlci9wa2cvcmVmZXJlbmNlcy9tZWRpYS90b2tlbl9wbGFjZWhvbGRlci5wbmc.webp",
//     "description": "dfd"
// }

const PayWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    border-radius: 8px;
    padding: 20px;

    .input {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: 0 5px;

            a {
                color: #0066cc;
                text-decoration: none;
            }

            a:hover {
                text-decoration: underline;
            }
        }
    }

    .ton-button {
        display: flex;
        justify-content: center;
    }
`;

export default function Pay() {
    const wallet = useTonWallet();
    const address = useTonAddress();
    // const { balance } = useFaucetJettonContract(USDT_ADDRESS);
    // console.log(balance);
    const { openAlert } = useAlertState();
    const [amount, setAmount] = useState(10);
    const [order, setOrder] = useState<{ amount: number; order_no: string } | null>(null);
    const { jettonWalletAddress } = useFaucetJettonContract(USDT_MASTER_ADDRESS);
    const [tonConnectUI, setOptions] = useTonConnectUI();

    // console.log("wallet", jettonWalletAddress, wallet);

    const handleRecharge = () => {
        console.log(amount);
        // const msg = {
        //     boc: "te6cckECBAEAASAAAeGIAaQsvdvbDSILDtSLaG8CHteh7akbbhlJQxD4PUOZ3o5gAhePWLqRcdnW7kFPShRSXRh9WpMxeWba/iKvPbonjKMm8/EyDbg1G13onatekhAR8YtROEBIXJk4GfzvYBR1qEFNTRi7M+auWAAAAFAAHAEBaGIAUH40SnHsm73+MA8CD7320XF8GRQ7p54DXNyF3oI9UCggL68IAAAAAAAAAAAAAAAAAAECAbIPin6lAAAAAAAAAABQMxQFbQgBnGjapO4zpXkxklK5yDIBXCSBS76jL+6xt0MnTTUtKNcAM40bVJ3GdK8mMkpXOQZAK4SQKXfUZf3WNuhk6aalpRrIAmJaAQMALgAAAAAyMDI0MDYyNzAyNTUxODEwOTQ5NOemuA==",
        //     // boc: "te6cckECBAEAARAAAeGIAaQsvdvbDSILDtSLaG8CHteh7akbbhlJQxD4PUOZ3o5gBuuSjgsZg4fRiZldXya4u64MW+sdnI9sdbIG7kQ7DBedBidViNMYjOI1Br7sBixh4OUW7QxZ1diB3xdVxG8t0GFNTRi7M+bN+AAAAFgAHAEBZmIAUH40SnHsm73+MA8CD7320XF8GRQ7p54DXNyF3oI9UCgYehIAAAAAAAAAAAAAAAAAAQIBsg+KfqUAAAAAAAAAAFH9Gw76CAGcaNqk7jOleTGSUrnIMgFcJIFLvqMv7rG3QydNNS0o1wAzjRtUncZ0ryYySlc5BkArhJApd9Rl/dY26GTppqWlGsgCYloBAwAQAAAAAHRlc3SIZXXv",
        // };
        // const msgBody = TonWeb.utils.base64ToBytes(msg.boc);
        // const cell: any = TonWeb.boc.Cell.oneFromBoc(msgBody);
        // const slice = cell.beginParse();
        // const op = slice.loadUint(32);
        // console.log(slice, op);
        // console.log(!op.eq(new TonWeb.utils.BN(0xf8a7ea5)));

        if (amount >= 10 && amount < 10000) {
            createRechargeOrder({ amount })
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        setOrder(res.data);
                        handleTransfer(res.data.order_no, res.data.amount);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            // handleTransfer("2024062702483638032", 136.66202);
        } else {
            openAlert("请输入有效金额", "warning");
        }
    };

    // 现在现有的地址：
    // jetton 的 master 地址（仅用来获取用户对应的 wallet 地址）
    // 用户钱包地址
    // 用户的 jetton 钱包地址
    // 接收 USDT 的钱包地址

    // https://docs.ton.org/develop/dapps/ton-connect/message-builders

    const handleTransfer = (orderNo: string, amount: number) => {
        const TRANSFER = 0xf8a7ea5; // transfer operation code
        const destinationAddress = Address.parse(DESTINATION_ADDRESS);

        const amountToTransfer = Math.floor(amount * 10 ** 9);

        if (!jettonWalletAddress || !orderNo || !destinationAddress) {
            throw new Error(
                `Please check the param ${jettonWalletAddress} ${orderNo} ${destinationAddress}`
            );
        }

        console.log(orderNo, amountToTransfer);

        const forwardPayload = beginCell()
            .storeUint(0, 32) // 0 opcode means we have a comment
            .storeStringTail(orderNo)
            .endCell();

        // https://github.com/ton-blockchain/TEPs/blob/master/text/0074-jettons-standard.md#1-transfer
        const body = beginCell()
            .storeUint(TRANSFER, 32) // jetton 转账操作码
            .storeUint(0, 64) // query_id:uint64
            .storeCoins(amountToTransfer) // amount:(VarUInteger 16) -  转账的 Jetton 金额（decimals 默认为 9）
            .storeAddress(destinationAddress) // destination:MsgAddress
            .storeAddress(destinationAddress) // response_destination:MsgAddress
            .storeBit(0)
            .storeCoins(toNano("0.02")) // forward amount (if >0, will send notification message)
            .storeBit(1) // we store forwardPayload as a reference
            .storeRef(forwardPayload)
            .endCell();
        const myTransaction = {
            validUntil: Math.floor(Date.now() / 1000) + 360,
            messages: [
                {
                    address: jettonWalletAddress,
                    amount: toNano("0.1").toString(),
                    payload: body.toBoc().toString("base64"),
                },
            ],
        };
        tonConnectUI.sendTransaction(myTransaction).then(res => {
            console.log(res);
            setAmount(0);
        });
    };

    return (
        <AppWrapper title="充值">
            <PayWrapper>
                <div className="input">
                    <div className="header">
                        <span>充值金额</span>
                        <a href="#">充值记录</a>
                    </div>
                    <TNumberInput
                        minNumber={10}
                        maxNumber={10000}
                        prefix="¥"
                        placeholder="最低10，最高10000"
                        value={amount}
                        handleValueChange={value => setAmount(value)}
                    />
                    <ExchangeRate amount={amount} />
                </div>
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
