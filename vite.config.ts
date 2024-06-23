import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), nodePolyfills()],
    base: ((process.env.VITE_GITHUB_REPOSITORY ?? "") + "/").match(/(\/.*)/)?.[1],
    server: {
        proxy: {
            "/pgapi": {
                target: process.env.VITE_API_BASE_URL,
                changeOrigin: true,
                secure: false,
                rewrite: path => path.replace(/^\/pgapi/, ""),
            },
        },
    },
});
