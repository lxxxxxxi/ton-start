import { beginCell, toNano, Address, Cell, fromNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { useFaucetJettonContract } from "../hooks/useFaucetJettonContract";
import { Card, FlexBoxCol, FlexBoxRow, Ellipsis } from "./styled/styled";
import { TButton } from "./Common/TButton";
import { USDT_DECIMALS, USDT_MASTER_ADDRESS } from "../utils/constant";
import TText from "./Common/TText";
import { Loader } from "react-feather";
import TLoader from "./Common/TLoader";
import { TonConnectButton } from "@tonconnect/ui-react";
import axios from "axios";
import { useEffect, useState } from "react";

export function Jetton() {
    const { jettonWalletAddress, balance } = useFaucetJettonContract(USDT_MASTER_ADDRESS);
    const [balanceByApi, setBalanceByApi] = useState<number>(0);

    const fetchBalance = async (jettonWalletAddress?: string) => {
        if (!jettonWalletAddress) return null;
        try {
            const res = await axios.get(
                `https://tonapi.io/v2/blockchain/accounts/${jettonWalletAddress}/methods/get_wallet_data`
            );
            const balance = res?.data?.decoded?.balance;
            if (balance) setBalanceByApi(balance);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchBalance(jettonWalletAddress);
    }, []);

    const balanceByApiFormat = balanceByApi / 10 ** USDT_DECIMALS;

    return (
        <Card title="Jetton">
            <TonConnectButton style={{ width: "100%", marginBottom: "20px" }} />
            <FlexBoxCol>
                <FlexBoxRow justify="space-between">
                    <TText fontSize="14px" noWrap>
                        {" "}
                        USDT Balance{" "}
                    </TText>
                    <TText color="info">{balance || balanceByApiFormat || 0}</TText>
                </FlexBoxRow>
                <FlexBoxRow justify="space-between" gap="20px">
                    <TText fontSize="14px" noWrap>
                        {" "}
                        Wallet Address
                    </TText>
                    <Ellipsis>
                        <TText color="info">{jettonWalletAddress}</TText>
                    </Ellipsis>
                </FlexBoxRow>
            </FlexBoxCol>
        </Card>
    );
}
