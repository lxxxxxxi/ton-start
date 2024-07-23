import { Wallet } from "@tonconnect/ui-react";
import { fromNano } from "ton";
import { Contract, ContractProvider, Address, Cell } from "ton-core";

export default class FaucetJettonWallet implements Contract {
    async getBalance(provider: ContractProvider) {
        // const { stack } = await provider.get("get_balance", []);
        const { stack } = await provider.get("get_wallet_data", []);
        console.log(stack);

        return fromNano(stack.readBigNumber());
    }

    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}
}
