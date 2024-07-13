import { ShiningBg } from "@/assets/imgs";
import { ModalType } from "@/states/useModalState";
import React, { useEffect } from "react";
import styled from "styled-components";

const getBackgroundColor = (type: ModalType) => {
    switch (type) {
        case "success":
            return "rgba(144, 238, 144, 0.9)"; // 绿色背景
        case "error":
            return "rgba(255, 99, 71, 0.9)"; // 红色背景
        case "loading":
            return "rgba(173, 216, 230, 0.9)"; // 蓝色背景
        default:
            return "rgba(215, 227, 252, 0.9)"; // 默认背景
    }
};

const ModalWrapper = styled.div<{ type: ModalType }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => getBackgroundColor(props.type)};

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    background-image: url(${ShiningBg});
    background-size: cover;
    background-position: center;
`;

const ModalContent = styled.div`
    text-align: center;
`;

const TModal = ({
    type = "success",
    onClose,
    pendingTime,
    children,
}: {
    type: ModalType;
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
        <ModalWrapper type={type}>
            <ModalContent>{children}</ModalContent>
        </ModalWrapper>
    );
};

export default TModal;
