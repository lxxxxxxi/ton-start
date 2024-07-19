import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import dotenv from "dotenv";
import path from "path";
import svgr from "@svgr/rollup";

dotenv.config();

function erudaPlugin(): PluginOption {
    return {
        name: "vite-plugin-eruda",
        apply: "build",
        transformIndexHtml(html) {
            return html.replace(
                "</body>",
                `<script src="https://cdn.jsdelivr.net/npm/eruda"></script>
         <script>eruda.init();</script>
         </body>`
            );
        },
    };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        plugins: [react(), svgr(), nodePolyfills()],
        base: process.env.VITE_GITHUB_REPOSITORY,
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
