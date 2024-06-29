// theme.ts
import { css } from "styled-components";

const FlexCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const theme = {
    FlexCenter,
};

export type ThemeType = typeof theme;
