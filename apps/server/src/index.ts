import http from "http";
import express from "express";
import ws from "ws";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { appRouter } from "./router";
import { createTRPCContext as createContext } from "./router/trpc";
import { FRONTEND_DIR, PORT } from "./config";

const app = express();
const server = http.createServer(app);

app.use(express.static(FRONTEND_DIR));
app.get("/", (req, res) => res.sendFile("index.html", { root: FRONTEND_DIR }));

const wss = new (ws.Server || ws)({
  server,
});
const handler = applyWSSHandler({ wss, router: appRouter, createContext });

wss.on("connection", async (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once("close", async () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});

server.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
  console.log("✅ WebSocket Server listening on ws://localhost:" + PORT);
});
