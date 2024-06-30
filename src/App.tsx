import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import { FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import TAlert from "./components/TAlert";
import { useAlertState } from "./states/useAlertState";
import { routes } from "./utils/routes";
import { theme } from "./utils/theme";
import { useEffect } from "react";

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

    useEffect(() => {
        alert(window.Telegram.WebApp.initData);
    }, []);

    return (
        <ThemeProvider theme={theme}>
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
                                {routes.map(route => {
                                    return (
                                        <Route
                                            key={route.key}
                                            path={route.path}
                                            element={route.component}
                                        />
                                    );
                                })}
                            </Routes>
                        </FlexBoxCol>
                    </AppContainer>
                </StyledApp>
            </Router>
        </ThemeProvider>
    );
}

export default App;
