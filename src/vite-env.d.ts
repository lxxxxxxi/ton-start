/// <reference types="vite/client" />

import { Telegram } from "@twa-dev/types";

declare global {
    interface Window {
        Telegram: Telegram;
    }
}

window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");

// src/@types/svg.d.ts
declare module "*.svg" {
    import * as React from "react";
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
