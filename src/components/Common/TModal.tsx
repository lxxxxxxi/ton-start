import { ShiningBg } from "@/assets/imgs";
import React, { useEffect } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(215, 227, 252, 0.9);

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    background-image: url(${ShiningBg});
    background-size: cover;
`;

const ModalContent = styled.div`
    text-align: center;
`;

const TModal = ({
    onClose,
    pendingTime,
    children,
}: {
    onClose: () => void;
    pendingTime: number;
    children: React.ReactNode;
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, pendingTime);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <ModalWrapper>
            <ModalContent>{children}</ModalContent>
        </ModalWrapper>
    );
};

export default TModal;
