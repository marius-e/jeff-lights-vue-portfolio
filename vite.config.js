import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteSingleFile } from "vite-plugin-singlefile";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith("ion-"),
                },
            },
        }),
        viteSingleFile({ useRecommendedBuildConfig: true }),
    ],
    resolve: {
        alias: [
            {
                find: "@",
                replacement: fileURLToPath(new URL("./src", import.meta.url)),
            },
        ],
        extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    },
});
