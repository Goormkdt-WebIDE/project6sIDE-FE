import copy from "rollup-plugin-copy";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        {
          src: "/node_modules/ace-builds/src-min-noconflict/*",
          dest: "public/ace-builds",
        },
      ],
    }),
  ],
});
