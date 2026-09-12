// vitest.config.js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",

    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],

    exclude: ["e2e/**", "node_modules/**"],

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
    },
  },
});
