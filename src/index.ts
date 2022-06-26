import { wwsConnectionHandler } from "./handlers";
import { WebSocketServer } from "ws";
import { httpServer } from "./http_server/index";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", wwsConnectionHandler);

wss.on("close", () => {
  // on close
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
