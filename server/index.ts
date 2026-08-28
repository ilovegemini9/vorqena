/**
 * Style reminder — Utilitarian Calculation Desk: keep the server minimal,
 * transparent, and focused on serving the calculator frontend.
 */
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer(): Promise<void> {
  const app = express();
  const server = createServer(app);

  // In production, the bundled server lives beside the public directory.
  // During the local build, the frontend is emitted to dist/public.
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Send the SPA shell for client-side routes such as /mortgage and /bmi.
  app.get("*", (_request, response) => {
    response.sendFile(path.join(staticPath, "index.html"));
  });

  const port = Number.parseInt(process.env.PORT ?? "3000", 10);
  const listenPort = Number.isFinite(port) && port > 0 ? port : 3000;

  server.listen(listenPort, () => {
    console.log(`Server running on http://localhost:${listenPort}/`);
  });
}

startServer().catch((error: unknown) => {
  console.error("Unable to start the calculator server.", error);
  process.exitCode = 1;
});

