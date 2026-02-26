import { build as viteBuild } from "vite";
import { rm, mkdir, access, rename } from "fs/promises";

async function buildAll() {
  await rm("dist", { recursive: true, force: true });
  await mkdir("dist/public", { recursive: true });

  console.log("building client...");
  await viteBuild({
    build: {
      outDir: "dist/public",
      emptyOutDir: false,
    },
  });

  try {
    await access("client/dist/public");
    await rm("dist/public", { recursive: true, force: true });
    await mkdir("dist", { recursive: true });
    await rename("client/dist/public", "dist/public");
    await rm("client/dist", { recursive: true, force: true });
  } catch {
    // no-op when vite writes directly to dist/public
  }

  console.log("client build complete -> dist/public");
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
