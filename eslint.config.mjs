// eslint.config.mjs
// `next build` runs ESLint and fails on errors. `no-undef` is here so a
// missing constant (e.g. a deleted options list) breaks the build instead
// of crashing a page in production.
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

const config = [
  { ignores: [".next/**", "node_modules/**", "public/**", "ebook/**", "Finding a partner/**"] },
  ...compat.extends("next/core-web-vitals"),
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "no-undef": "error",
      "react/jsx-no-undef": "error",
    },
  },
];

export default config;
