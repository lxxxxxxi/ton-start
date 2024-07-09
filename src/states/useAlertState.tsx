import { useAtom } from "jotai";
import { alertStateAtom, initialAlertState } from "./atoms";
import { AlertType } from "../components/Common/TAlert";

export interface AlertState {
    isVisible: boolean;
    title: string;
    message: string;
    type: AlertType;
}

export const useAlertState = () => {
    const [alertState, setAlertState] = useAtom(alertStateAtom);

    const resetAlertState = () => {
        setAlertState(initialAlertState);
    };

    const openAlert = (type: AlertType, title: string, message: string) => {
        setAlertState({
            isVisible: true,
            title,
            message,
            type,
        });
    };

    return { alertState, resetAlertState, openAlert };
};
