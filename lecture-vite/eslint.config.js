module.exports = {
  parser: "@typescript-eslint/parser", // TypeScript 파서를 사용합니다
  extends: [
    "eslint:recommended", // 기본 ESLint 권장 규칙
    "plugin:@typescript-eslint/recommended", // TypeScript 권장 규칙
    "plugin:react/recommended", // React 권장 규칙
    "plugin:react-hooks/recommended", // React Hooks 권장 규칙
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  rules: {
    // TypeScript 규칙
  },
  settings: {
    react: {
      version: "detect", // React 버전을 자동으로 감지합니다
    },
  },
};
