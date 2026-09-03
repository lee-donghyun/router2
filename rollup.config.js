import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "lib/index.ts",
  external: ["react", "react-dom"],
  output: [
    {
      dir: "dist",
      entryFileNames: "cjs/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      dir: "dist",
      entryFileNames: "esm/index.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" })],
};
