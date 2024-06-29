import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        plugins: [react(), nodePolyfills()],
        base: process.env.VITE_GITHUB_REPOSITORY,
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
        esbuild: {
            drop: mode === "prod" ? ["console", "debugger"] : [],
        },
        build: {
            outDir: "dist",
            assetsDir: "assets",
            assetsInlineLimit: 4096,
            cssCodeSplit: true,
            sourcemap: false,
            minify: "esbuild",
        },
    };
});
