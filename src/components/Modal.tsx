import React from "react";
import TModal from "./Common/TModal";
import { useModalState } from "@/states/useModalState";
import { Dots } from "./Common/TLoadingBar";

const LoadingContent = ({ state }: { state: { title: string; content: React.ReactNode } }) => {
    return (
        <div>
            <Dots>{state.title}</Dots>
            {state.content}
        </div>
    );
};

const SuccessContent = ({ state }: { state: { title: string; content: React.ReactNode } }) => {
    return (
        <div>
            <h1>{state.title}</h1>
            {state.content}
        </div>
    );
};

const ErrorContent = ({ state }: { state: { title: string; content: React.ReactNode } }) => {
    return (
        <div>
            <h1>{state.title}</h1>
            {state.content}
        </div>
    );
};

export default function Modal() {
    const { modalState, closeModal } = useModalState();

    const { successState, errorState, loadingState, pendingTime } = modalState;

    return modalState.isVisible ? (
        <TModal onClose={closeModal} type={modalState.type} pendingTime={pendingTime}>
            {modalState.type === "loading" && loadingState && (
                <LoadingContent state={loadingState} />
            )}
            {modalState.type === "success" && successState && (
                <SuccessContent state={successState} />
            )}
            {modalState.type === "error" && errorState && <SuccessContent state={errorState} />}
        </TModal>
    ) : null;
}
