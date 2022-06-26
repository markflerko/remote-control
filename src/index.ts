import { wwsConnectionHandler } from "./handlers";
import WebSocket, { createWebSocketStream, WebSocketServer } from "ws";
import { httpServer } from "./http_server/index";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

export const sockets: WebSocket[] = [];

type wsType = WebSocket & { isAlive?: boolean };

wss.on("connection", (ws: wsType) => {
  function heartbeat() {
    ws.isAlive = true;
  }

  ws.isAlive = true;
  ws.on("pong", heartbeat);

  sockets.push(ws);

  const wsStream = createWebSocketStream(ws, {
    encoding: "utf8",
    decodeStrings: false,
  });

  wsStream.on("data", wwsConnectionHandler(wsStream));

  wwsConnectionHandler;
});

process.on("SIGINT", () => {
  sockets.forEach((ws) => ws.close());
  process.exit();
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws: wsType) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
  });
}, 1000);

wss.on("close", function close() {
  console.log("close");

  clearInterval(interval);
});

process.on("SIGINT", () => {
  sockets.forEach((ws) => ws.close());
  process.exit();
});
process.on("exit", () => {
  sockets.forEach((ws) => ws.close());
});

wss.on("error", (err) => {
  console.log(err);
});

process.on("uncaughtException", (err) => {
  console.log(err);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
});
