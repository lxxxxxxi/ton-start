import "./App.css";
import styled from "styled-components";
import { FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import AccountCenter from "./pages/AccountCenter";
import GameList from "./pages/GameList";
import Pay from "./pages/Pay";
import Withdraw from "./pages/Withdraw";
import Login from "./pages/Login";
import BettingList from "./pages/BettingList";
import PayHistory from "./pages/PayHistory";
import WithdrawHistory from "./pages/WithdrawHistory";
import TAlert from "./components/TAlert";
import { useAlertState } from "./states/useAlertState";

const StyledApp = styled.div`
    background-color: #222;
    color: #d6d6d6;
    min-height: 100vh;
    padding: 20px 20px;
`;

const AppContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
`;

function App() {
    const { network } = useTonConnect();
    const { alertState, resetAlertState } = useAlertState();

    return (
        <Router>
            <StyledApp>
                <AppContainer>
                    <FlexBoxCol>
                        {alertState.isVisible && (
                            <TAlert
                                type={alertState.type}
                                message={alertState.message}
                                onClose={resetAlertState}
                            />
                        )}
                        <Routes>
                            <Route path="/" element={<AccountCenter />} />
                            <Route path="/login" element={<Login />} />
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
