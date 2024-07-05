import { useEffect } from "react";
import { X } from "react-feather";
import styled, { keyframes } from "styled-components";

const slideInDown = keyframes`
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(0);
    }
`;

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

    padding: 15px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: Arial, sans-serif;
    animation: ${slideInRight} 0.5s ease-out;

    &.alert-success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    &.alert-error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    &.alert-info {
        background-color: #d1ecf1;
        color: #0c5460;
        border: 1px solid #bee5eb;
    }

    &.alert-warning {
        background-color: #fff3cd;
        color: #856404;
        border: 1px solid #ffeeba;
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
