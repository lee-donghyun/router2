import config from "eslint-config-react-app-essentials";

const typescript = [
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];

const react = [
  {
    settings: {
      react: { version: "detect" },
    },
  },
];

export default [
  ...config.concat(typescript, react).map((c) => ({
    ...c,
    files: ["lib/**/*.{ts,tsx}"],
  })),
];
