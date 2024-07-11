import { useAtom } from "jotai";
import { initModalState, modalStateAtom } from "./atoms";

export interface ModalState {
    isVisible: boolean;
    type: null | "loading" | "success" | "error";
    pendingTime: number;
    successState: {
        title: string;
        content: React.ReactNode;
    } | null;
    errorState: {
        title: string;
        content: React.ReactNode;
    } | null;
    loadingState: {
        title: string;
        content: React.ReactNode;
    } | null;
}

export const useModalState = () => {
    const [modalState, setModalState] = useAtom(modalStateAtom);

    const closeModal = () => {
        setModalState(initModalState);
    };

    const openLoadingModal = (title: string, content: React.ReactNode, loadingTime?: number) => {
        setModalState({
            isVisible: true,
            pendingTime: loadingTime || 4000,
            type: "loading",
            successState: null,
            errorState: null,
            loadingState: {
                title,
                content,
            },
        });
    };

    const openSuccessModal = (title: string, content: React.ReactNode) => {
        setModalState({
            isVisible: true,
            pendingTime: 4000,
            type: "success",
            successState: {
                title,
                content,
            },
            errorState: null,
            loadingState: null,
        });
    };

    const openErrorModal = (title: string, content: React.ReactNode) => {
        setModalState({
            isVisible: true,
            type: "error",
            pendingTime: 4000,
            successState: null,
            errorState: {
                title,
                content,
            },
            loadingState: null,
        });
    };
    return { modalState, closeModal, openLoadingModal, openSuccessModal, openErrorModal };
};
