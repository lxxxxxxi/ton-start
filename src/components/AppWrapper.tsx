import React from "react";
import TNavBar from "./TNavBar";
import { TonConnectButton } from "@tonconnect/ui-react";
import styled from "styled-components";

const TonConnectButtonWrapper = styled.div`
    ${({ theme }) => theme.FlexCenter}
    width: 170px;
    height: 35px;
`;

export default function AppWrapper({
    title,
    isNeedTonConnectButton = false,
    children,
}: {
    title: string;
    isNeedTonConnectButton?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div>
            <TNavBar
                title={title}
                extra={
                    isNeedTonConnectButton ? (
                        <TonConnectButtonWrapper>
                            <TonConnectButton />
                        </TonConnectButtonWrapper>
                    ) : undefined
                }
            />
            {children}
        </div>
    );
}
