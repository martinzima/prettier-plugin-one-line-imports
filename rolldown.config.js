import { defineConfig } from "rolldown";

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      format: "esm",
      file: "dist/index.mjs",
    },
    {
      format: "cjs",
      file: "dist/index.cjs",
    },
  ],
  resolve: {
    extensions: [".ts"],
  },
  external: ["prettier", /^prettier\//],
});