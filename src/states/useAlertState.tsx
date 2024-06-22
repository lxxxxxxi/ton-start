import { useAtom } from "jotai";
import { alertStateAtom } from "./atoms";
import { AlertType } from "../components/TAlert";

export interface AlertState {
    isVisible: boolean;
    message: string;
    type: AlertType;
}

export const initialAlertState: AlertState = {
    isVisible: false,
    message: "",
    type: "info",
};

export const useAlertState = () => {
    const [alertState, setAlertState] = useAtom(alertStateAtom);

    const resetAlertState = () => {
        setAlertState(initialAlertState);
    };

    const openAlert = (message: string, type: AlertType) => {
        setAlertState({
            isVisible: true,
            message,
            type,
        });
    };

    return { alertState, resetAlertState, openAlert };
};
