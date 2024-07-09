import { useEffect } from "react";
import { X } from "react-feather";
import styled, { keyframes } from "styled-components";

const slideInRight = keyframes`
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
`;

const AlertWrapper = styled.div`
    /* width: 100vw; */
    position: fixed;
    right: 0;
    margin: 20px;
    z-index: 9999;

    padding: 10px 15px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: ${slideInRight} 0.5s ease-out;

    border: 2px solid #341d1a;
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
`;

const AlertCloseButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;

export type AlertType = "success" | "error" | "info" | "warning";

const TAlert = ({
    type,
    message,
    onClose,
}: {
    type: AlertType;
    message: string;
    onClose: () => void;
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // 设置为3秒后自动关闭
        return () => clearTimeout(timer);
    }, []);

    return (
        <AlertWrapper className={`alert-${type}`}>
            <AlertMessage>{message}</AlertMessage>
            <AlertCloseButton onClick={onClose}>
                <X />{" "}
            </AlertCloseButton>
        </AlertWrapper>
    );
};

export default TAlert;
