import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    environmentOptions: {
      happyDOM: {
        settings: {
          disableCSSFileLoading: true,
          disableJavaScriptFileLoading: true,
        },
      },
    },
    globals: true,
    include: ["packages/core/src/js/**/*.test.js"],
    restoreMocks: true,
    clearMocks: true,
  },
});
