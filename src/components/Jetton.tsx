import { beginCell, toNano, Address, Cell, fromNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { useFaucetJettonContract } from "../hooks/useFaucetJettonContract";
import { Card, FlexBoxCol, FlexBoxRow, Ellipsis } from "./styled/styled";
import { TButton } from "./TButton";
import { USDT_MASTER_ADDRESS } from "../utils/constant";

export function Jetton() {
    const { connected } = useTonConnect();
    const { transfer, jettonWalletAddress, balance } = useFaucetJettonContract(USDT_MASTER_ADDRESS);

    return (
        <Card title="Jetton">
            <FlexBoxCol>
                <h3>Faucet Jetton</h3>
                <FlexBoxRow>
                    Wallet
                    <Ellipsis>{jettonWalletAddress}</Ellipsis>
                </FlexBoxRow>
                <FlexBoxRow>
                    Balance
                    <div>{balance ?? "Loading..."}</div>
                </FlexBoxRow>
                <TButton
                    disabled={!connected}
                    onClick={async () => {
                        transfer("0QDONG1SdxnSvJjJKVzkGQCuEkCl31GX91jboZOmmpaUa0Au");
                    }}
                >
                    transfer
                </TButton>
            </FlexBoxCol>
        </Card>
    );
}
