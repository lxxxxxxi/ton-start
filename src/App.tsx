import "./App.css";
// import "@telegram-apps/telegram-ui/dist/styles.css";
import styled, { ThemeProvider } from "styled-components";
import { FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { Route, HashRouter as Router, Routes, useLocation } from "react-router-dom";
import TAlert from "./components/Common/TAlert";
import { useAlertState } from "./states/useAlertState";
import { routes } from "./utils/routes";
import { theme } from "./utils/theme";
import { useEffect } from "react";
import { TELE } from "./utils/tele";

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
    const { network } = useTonConnect();
    const { alertState, resetAlertState } = useAlertState();
    // const { search } = useLocation();

    useEffect(() => {
        // 获取 URL 参数
        // const urlParams = new URLSearchParams(window.location.search);
        // console.log("121212", window.location.search);
        // const gameType = urlParams.get("gameType");
        // console.log("gameType", gameType);
        // console.log(33333, window.Telegram.WebApp.initDataUnsafe.start_param);
        // console.log(44444, window.Telegram.WebApp.initDataUnsafe);
        // console.log(44444, window.Telegram.WebApp);
        // console.log(1111, search);
        // console.log(2222, new URLSearchParams(search));
        // if (gameType) {
        //   // 根据 gameType 跳转到特定页面
        //   switch (gameType) {
        //     case '6':
        //       navigate('/game-list');
        //       break;
        //     // 其他 gameType 的处理
        //     default:
        //       navigate('/');
        //       break;
        //   }
        // }
    }, []);

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
