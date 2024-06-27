import { TonConnectButton } from "@tonconnect/ui-react";
import { useCounterContract } from "../hooks/useCounterContract";
import { useTonConnect } from "../hooks/useTonConnect";

import { Card, FlexBoxCol, FlexBoxRow, Ellipsis } from "./styled/styled";
import { TButton } from "./TButton";

export function Counter() {
    const { connected } = useTonConnect();
    const { value, address, sendIncrement } = useCounterContract();

    console.log(value);

    return (
        <div className="Container">
            <TonConnectButton />

            <Card>
                <FlexBoxCol>
                    <h3>Counter</h3>
                    <FlexBoxRow>
                        <b>Address</b>
                        <Ellipsis>{address}</Ellipsis>
                    </FlexBoxRow>
                    <FlexBoxRow>
                        <b>Value</b>
                        <div>{value ?? "Loading..."}</div>
                    </FlexBoxRow>
                    <TButton
                        disabled={!connected}
                        className={`Button ${connected ? "Active" : "Disabled"}`}
                        onClick={() => {
                            sendIncrement();
                        }}
                    >
                        Increment
                    </TButton>
                </FlexBoxCol>
            </Card>
        </div>
    );
}