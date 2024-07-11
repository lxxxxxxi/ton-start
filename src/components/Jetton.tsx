import { beginCell, toNano, Address, Cell, fromNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { useFaucetJettonContract } from "../hooks/useFaucetJettonContract";
import { Card, FlexBoxCol, FlexBoxRow, Ellipsis } from "./styled/styled";
import { TButton } from "./Common/TButton";
import { USDT_MASTER_ADDRESS } from "../utils/constant";
import TText from "./Common/TText";
import { Loader } from "react-feather";
import TLoader from "./Common/TLoader";
import { TonConnectButton } from "@tonconnect/ui-react";

export function Jetton() {
    const { connected } = useTonConnect();
    const { jettonWalletAddress, balance } = useFaucetJettonContract(USDT_MASTER_ADDRESS);

    return (
        <Card title="Jetton">
            <TonConnectButton style={{ width: "100%", marginBottom: "20px" }} />
            <FlexBoxCol>
                <FlexBoxRow justify="space-between">
                    <TText fontSize="14px" noWrap>
                        {" "}
                        USDT Balance{" "}
                    </TText>
                    <TText color="info">{balance ?? <TLoader size={16} />}</TText>
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
