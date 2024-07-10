import { useEffect } from "react";
import { X } from "react-feather";
import styled, { keyframes } from "styled-components";
import TText from "./TText";

const slideInRight = keyframes`
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
`;

const AlertWrapper = styled.div`
    max-width: 80vw;
    position: fixed;
    right: 0;
    margin: 20px;
    z-index: 9999;

    padding: 6px 20px 6px 6px;
    border-radius: 5px;
    animation: ${slideInRight} 0.5s ease-out;

    border: 3px solid #341d1a;
    box-shadow: 3px 3px 0px #341d1a;

    &.alert-success {
        background-color: #d4edda;
        color: #155724;
    }

    &.alert-error {
        background-color: #f8d7da;
        color: #721c24;
    }

    &.alert-info {
        background-color: #d1ecf1;
        color: #0c5460;
    }

    &.alert-warning {
        background-color: #fff3cd;
        color: #856404;
    }
`;

const AlertMessage = styled.span`
    flex: 1;
    margin-right: 10px;
`;

const AlertCloseButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;

    position: absolute;
    top: 6px;
    right: 0px;
`;

export type AlertType = "success" | "error" | "info" | "warning";

const TAlert = ({
    type,
    title,
    message,
    onClose,
}: {
    type: AlertType;
    title: string;
    message: string;
    onClose: () => void;
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            // onClose();
        }, 4000); // 设置为3秒后自动关闭
        return () => clearTimeout(timer);
    }, []);

    return (
        <AlertWrapper className={`alert-${type}`}>
            <AlertMessage>{title}</AlertMessage>
            <AlertCloseButton onClick={onClose}>
                <X size={15} />{" "}
            </AlertCloseButton>
            <TText fontSize={"14px"} style={{ opacity: 0.8 }} fontWeight="400">
                {message}
            </TText>
        </AlertWrapper>
    );
};

export default TAlert;
