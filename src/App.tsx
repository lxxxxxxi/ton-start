import "./App.css";
// import "@telegram-apps/telegram-ui/dist/styles.css";
import styled, { ThemeProvider } from "styled-components";
import { FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import TAlert from "./components/Common/TAlert";
import { useAlertState } from "./states/useAlertState";
import { routes } from "./utils/routes";
import { theme } from "./utils/theme";
import { useEffect } from "react";

const StyledApp = styled.div`
    background-color: ${({ theme }) => theme.Colors.Bg1};
    min-height: 100vh;
`;

const AppContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
`;

function App() {
    const { network } = useTonConnect();
    const { alertState, resetAlertState } = useAlertState();

    useEffect(() => {
        // alert(
        //     <span
        //         onClick={() =>
        //             navigator.clipboard.writeText(window.Telegram.WebApp.initData.toString())
        //         }
        //     >
        //         {window.Telegram.WebApp.initData}
        //     </span>
        // );
        // alert(API_BASE_URL);
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
