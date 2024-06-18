import { useState } from "react";
import styled from "styled-components";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Input } from "./styled/styled";
import { TButton } from "./TButton";

export function TransferTon() {
    const { sender, connected } = useTonConnect();

    const [tonAmount, setTonAmount] = useState("0.01");
    const [tonRecipient, setTonRecipient] = useState(
        "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c"
    );

    return (
        <Card>
            <FlexBoxCol>
                <h3>Transfer TON</h3>
                <FlexBoxRow>
                    <label>Amount </label>
                    <Input
                        style={{ marginRight: 8 }}
                        type="number"
                        value={tonAmount}
                        onChange={e => setTonAmount(e.target.value)}
                    ></Input>
                </FlexBoxRow>
                <FlexBoxRow>
                    <label>To </label>
                    <Input
                        style={{ marginRight: 8 }}
                        value={tonRecipient}
                        onChange={e => setTonRecipient(e.target.value)}
                    ></Input>
                </FlexBoxRow>
                <TButton
                    disabled={!connected}
                    style={{ marginTop: 18 }}
                    onClick={async () => {
                        sender.send({
                            to: Address.parse(tonRecipient),
                            value: toNano(tonAmount),
                        });
                    }}
                >
                    Transfer
                </TButton>
            </FlexBoxCol>
        </Card>
    );
}
