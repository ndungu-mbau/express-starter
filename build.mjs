import * as esbuild from "esbuild";
import { aliasPath } from "esbuild-plugin-alias-path"

await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "cjs",
  outfile: "dist/index.js",
  sourcemap: true,
  external: [
    // Packages you don't want bundled (e.g. native modules)
    // "bcrypt", "sharp"
  ],
  plugins: [aliasPath({
    alias: { '~/*': './src/*' }
  })]
});

console.log("Build complete ✓");