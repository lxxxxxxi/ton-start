import styled from "styled-components";

const themeColors: { [key: string]: string } = {
    primary: "#007bff",
    secondary: "#6c757d",
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
    light: "#f8f9fa",
    dark: "#343a40",
};

const getColor = (color: string): string => {
    return themeColors[color] || color;
};

interface TTextProps {
    color?: string;
    fontSize?: string;
    lineHeight?: string;
    textAlign?: "left" | "right" | "center" | "justify";
    fontWeight?: string;
    margin?: string;
    padding?: string;
    textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
}

const TText = styled.div<TTextProps>`
    color: ${props => getColor(props.color || "inherit")};
    font-size: ${props => props.fontSize || "inherit"};
    line-height: ${props => props.lineHeight || "inherit"};
    text-align: ${props => props.textAlign || "left"};
    font-weight: ${props => props.fontWeight || "normal"};
    margin: ${props => props.margin || "0"};
    padding: ${props => props.padding || "0"};
    text-transform: ${props => props.textTransform || "none"};
`;

export default TText;
