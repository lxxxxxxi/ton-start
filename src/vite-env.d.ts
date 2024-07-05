/// <reference types="vite/client" />
interface Window {
    Telegram: any;
}

// src/@types/svg.d.ts
declare module "*.svg" {
    import * as React from "react";
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
