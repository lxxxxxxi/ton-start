import { beginCell, toNano, Address, Cell, fromNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { useFaucetJettonContract } from "../hooks/useFaucetJettonContract";
import { Card, FlexBoxCol, FlexBoxRow, Ellipsis } from "./styled/styled";
import { TButton } from "./TButton";

export function Jetton() {
    const { connected } = useTonConnect();
    const { mint, jettonWalletAddress, balance } = useFaucetJettonContract();

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
                        mint();
                    }}
                >
                    Get jettons from faucet
                </TButton>
            </FlexBoxCol>
        </Card>
    );
}
