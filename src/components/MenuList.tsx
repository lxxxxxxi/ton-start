import React, { useState, useEffect, useRef, useCallback } from "react";
import styled, { css } from "styled-components";

const ToolTipContainer = styled.div`
    position: relative;
    display: inline-block;
`;
const ToolTipBox = styled.div<{
    maxWidth: string;
    visible: boolean;
}>`
    position: absolute;
    top: 30px;
    right: 10px;
    margin-top: 24px;

    min-width: 150px;
    max-width: ${({ maxWidth }) => maxWidth};
    border-radius: 8px;
    border: 2px solid var(--Text-heading, #000);
    background: #fff;
    box-shadow: 4px 4px 0px 0px #000;
    padding: 6px;
    z-index: 1000;
    text-align: left;

    opacity: ${({ visible }) => (visible ? 1 : 0)};
    visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
    transition: opacity 0.3s, visibility 0.3s;
`;

const MenuList = ({
    content,
    trigger = "hover",
    maxWidth = "300px",
    children,
}: {
    content: React.ReactNode | undefined;
    trigger?: "hover" | "click";
    maxWidth?: string;
    children: React.ReactNode;
}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (trigger === "hover") setVisible(true);
    };

    const handleMouseLeave = () => {
        if (trigger === "hover") setVisible(false);
    };

    const handleClick = () => {
        if (trigger === "click") setVisible(true);
    };

    const handleOutsideClick = useCallback(
        (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setVisible(false);
            }
        },
        [containerRef]
    );

    useEffect(() => {
        if (trigger === "click" && visible) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [trigger, handleOutsideClick, visible]);

    return (
        <ToolTipContainer
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {children}
            {content && (
                <ToolTipBox
                    ref={containerRef}
                    className="tooltip-box"
                    visible={visible}
                    maxWidth={maxWidth}
                >
                    {content}
                </ToolTipBox>
            )}
        </ToolTipContainer>
    );
};

export default MenuList;
