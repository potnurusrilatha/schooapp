import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Extend Next.js + TypeScript configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Explicitly tell ESLint what to ignore
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/dist/**",
      "**/coverage/**",
      "**/public/**",     // ✅ public folder (images, icons, etc.)
      "**/*.png",
      "**/*.jpg",
      "**/*.jpeg",
      "**/*.gif",
      "**/*.svg",
      "**/*.ico",
      "**/*.pdf",
      "**/*.woff",
      "**/*.ttf",
      "**/*.eot",
    ],
  },
];
