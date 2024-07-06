// theme.ts
import { DefaultTheme, css } from "styled-components";

const FlexCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Colors = {
    Primary: "#f2ac47",
    Secondary: "#AB1C34",

    Bg1: "#fbf4c2",
    Bg2: "#dff2ae",
    Bg3: "#f8dd71",

    Text1: "#ffffff",
    Text2: "#FFC434",
    Text3: "#311e1b",

    Blue1: "#b1ddf4",
    Blue2: "#50a5d8",
    Blue3: "#3274c6",
};

export const theme: DefaultTheme = {
    FlexCenter,
    Colors,
};

export type ThemeType = typeof theme;
