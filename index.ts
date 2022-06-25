import Jimp from "jimp";
import { httpServer } from "./src/http_server/index";
import robot from "robotjs";
import { WebSocketServer } from "ws";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Connection accepted");

  ws.on("message", (data) => {
    const [cmd, coord] = data.toString().split(" ");

    switch (cmd) {
      case "mouse_position":
        const { x, y } = robot.getMousePos();
        ws.send(`mouse_position ${x}, ${y}`);
        break;

      default:
        break;
    }
  });
});

wss.on("close", () => {
  //Close connection
});
