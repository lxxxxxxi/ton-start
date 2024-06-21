import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { TButton } from "./components/TButton";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import AccountCenter from "./pages/AccountCenter";
import GameList from "./pages/GameList";
import Pay from "./pages/Pay";
import Withdraw from "./pages/Withdraw";
import BettingList from "./pages/BettingList";
import PayHistory from "./pages/PayHistory";
import WithdrawHistory from "./pages/WithdrawHistory";

const StyledApp = styled.div`
    /* background-color: #e8e8e8; */
    color: black;

    @media (prefers-color-scheme: dark) {
        background-color: #222;
        color: white;
    }
    min-height: 100vh;
    padding: 20px 20px;
`;

const AppContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
`;

function App() {
    const { network } = useTonConnect();

    return (
        <Router>
            <StyledApp>
                <AppContainer>
                    <FlexBoxCol>
                        {/* <FlexBoxRow>
                        <TonConnectButton />
                        <TButton>
                            {network ? (network === CHAIN.MAINNET ? "mainnet" : "testnet") : "N/A"}
                        </TButton>
                    </FlexBoxRow>
                    <Counter />
                    <TransferTon />
                    <Jetton /> */}
                        <Routes>
                            <Route path="/" element={<AccountCenter />} />
                            <Route path="/gamelist" element={<GameList />} />
                            <Route path="/pay" element={<Pay />} />
                            <Route path="/pay/history" element={<PayHistory />} />
                            <Route path="/withdraw" element={<Withdraw />} />
                            <Route path="/withdraw/history" element={<WithdrawHistory />} />
                            <Route path="/bettinglist" element={<BettingList />} />
                            {/* <Route component={NotFound} /> */}
                        </Routes>
                    </FlexBoxCol>
                </AppContainer>
            </StyledApp>
        </Router>
    );
}

export default App;
