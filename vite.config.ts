import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

console.log("VITE_API_BASE_URL", process.env.VITE_API_BASE_URL);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), nodePolyfills()],
    base: ((process.env.GITHUB_REPOSITORY ?? "") + "/").match(/(\/.*)/)?.[1],
    server: {
        proxy: {
            "/pgapi": {
                target: "http://47.115.201.164:8080/",
                changeOrigin: true,
                secure: false,
                rewrite: path => path.replace(/^\/pgapi/, ""),
            },
        },
    },
});
