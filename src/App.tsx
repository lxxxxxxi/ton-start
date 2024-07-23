import "./App.css";
// import "@telegram-apps/telegram-ui/dist/styles.css";
import styled, { ThemeProvider } from "styled-components";
import { FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import { Route, HashRouter as Router, Routes, useLocation, useNavigate } from "react-router-dom";
import TAlert from "./components/Common/TAlert";
import { useAlertState } from "./states/useAlertState";
import { routes } from "./utils/routes";
import { theme } from "./utils/theme";
import Modal from "./components/Modal";

const StyledApp = styled.div`
    background-color: ${({ theme }) => theme.Colors.Bg1};
    font-weight: 500;
    min-height: 100dvh;
`;

const AppContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
`;

function App() {
    const { alertState, resetAlertState } = useAlertState();

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <StyledApp>
                    <AppContainer>
                        <FlexBoxCol>
                            {alertState.isVisible && (
                                <TAlert
                                    title={alertState.title}
                                    type={alertState.type}
                                    message={alertState.message}
                                    onClose={resetAlertState}
                                />
                            )}
                            <Modal />
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
