import { Wallet } from "@tonconnect/ui-react";
import { fromNano } from "ton";
import {
    Contract,
    ContractProvider,
    Sender,
    Address,
    Cell,
    contractAddress,
    beginCell,
    toNano,
} from "ton-core";

export default class FaucetJettonWallet implements Contract {
    async getBalance(provider: ContractProvider) {
        const { stack } = await provider.get("get_wallet_data", []);
        return fromNano(stack.readBigNumber());
    }

    /**
     *
     * @param provider 合约提供者，用于发送交易和调用合约方法。
     * @param via 交易的发起者（Sender 表示发起交易的实体，负责签名交易并提交到区块链，通常包含发送者的公私钥或签名相关的信息）
     * @param toAddress 接受 Jetton 的钱包地址
     * @param amount 要转账的数量
     * @param fromAddress  Jetton 的钱包地址
     */
    async sendTransfer(
        provider: ContractProvider,
        via: Sender,
        toAddress: Address,
        amount: number,
        fromAddress: Address,
        comment?: string
    ) {
        const TRANSFER = 0x178d4519; // transfer operation code

        const transferBody = beginCell() // 开始构建一个新的 Cell 实例（Cell是Ton链中的基本数据单元，用于存储和传输数据），返回一个 CellBuilder 实例。
            .storeUint(TRANSFER, 32) // 在 Cell 中存储一个无符号整数，返回一个 CellBuilder 实例
            .storeUint(0, 64) // queryid // 在 Cell 中存储一个无符号整数。这里 0 表示 queryid，用于查询或者交易的唯一ID，64表示存储的位宽。（这个参数的唯一性是为了区分特定合约或操作的范围内唯一，为了区分同一合约的不同操作）
            .storeCoins(toNano(amount)) // 在 Cell 中存储金额信息，toNano 将amount转换为纳米Ton也就是最小单位的 Ton
            .storeAddress(toAddress) // 在 Cell 中存储接受转账的地址信息
            .storeAddress(fromAddress) // 发送 Jetton 的地址
            .storeCoins(toNano("0.001")) // forward_fee 表示在转账过程中发送消息到目标地址所需要的转发费用，用于覆盖转发消息的成本，确保消息可以到达接收地址。
            .storeBit(false); // no payload 在 Cell 中存储一个布尔值，用于标识是否有 payload 也就是额外的负载

        if (comment) {
            transferBody.storeRef(
                beginCell()
                    .storeStringTail(comment) // Storing comment in the reference cell
                    .endCell()
            );
        }

        const body = transferBody.endCell(); // 构建并返回完整的 Cell 实例
        console.log(body, "body");

        try {
            // provider.internal 将构建好的消息体作为交易一部分，通过 Sender 发起交易并且提交
            const result = await provider.internal(via, {
                value: toNano("0.1"), // fee 执行费用（矿工费和合约执行费）
                body,
            });
            console.log("success", result);
        } catch (e) {
            console.log(e);
        }
    }

    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}
}
