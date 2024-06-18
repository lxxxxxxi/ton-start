import styled from "styled-components";

export const TButton = styled.button`
    background-color: ${props => (props.disabled ? "#6e6e6e" : "var(--tg-theme-button-color)")};
    border: 0;
    border-radius: 8px;
    padding: 10px 20px;
    color: var(--tg-theme-button-text-color);
    font-weight: 700;
    cursor: pointer;
    pointer-events: ${props => (props.disabled ? "none" : "inherit")};
`;
