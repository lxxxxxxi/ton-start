import { beginCell, toNano, Address, Cell, fromNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { useFaucetJettonContract } from "../hooks/useFaucetJettonContract";
import { Card, FlexBoxCol, FlexBoxRow, Ellipsis } from "./styled/styled";
import { TButton } from "./TButton";
import { USDT_MASTER_ADDRESS } from "../utils/constant";
import TText from "./TText";
import { Loader } from "react-feather";
import TLoader from "./TLoader";

export function Jetton() {
    const { connected } = useTonConnect();
    const { transfer, jettonWalletAddress, balance } = useFaucetJettonContract(USDT_MASTER_ADDRESS);

    return (
        <Card title="Jetton">
            <FlexBoxCol>
                <FlexBoxRow justify="space-between">
                    Your USDT Balance
                    <TText color="info">{balance ?? <TLoader size={16} />}</TText>
                </FlexBoxRow>
                <FlexBoxRow justify="space-between" gap="20px">
                    <div style={{ whiteSpace: "nowrap" }}> Wallet Adrress</div>
                    <Ellipsis>
                        <TText color="info">{jettonWalletAddress}</TText>
                    </Ellipsis>
                </FlexBoxRow>
            </FlexBoxCol>
        </Card>
    );
}
