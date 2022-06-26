import { httpServer } from "./http_server/index";
import robot from "robotjs";
import { WebSocketServer } from "ws";
import { mouseRight } from "./services/mouseRight";
import { mouseUp } from "./services/mouseUp";
import { mouseLeft } from "./services/mouseLeft";
import { mouseDown } from "./services/mouseDown";
import { drawRectangle } from "./services/drawRectangle";
import { drawCircle } from "./services/drawCircle";
import { printScreen } from "./services/printScreen";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", async (ws) => {
  console.log("Connection accepted");

  ws.on("message", async (data) => {
    const [cmd, ...coords] = data.toString().split(" ");
    const a1 = Number(coords[0]) || 0;
    const a2 = Number(coords[1]) || 0;

    //getCoords
    const { x, y } = robot.getMousePos();
    const pos = {
      x,
      y,
    };

    switch (cmd) {
      case "mouse_position":
        ws.send(`mouse_position ${pos.x},${pos.y}`);
        break;
      case "mouse_up":
        mouseUp(pos, a1);
        break;
      case "mouse_down":
        mouseDown(pos, a1);
        break;
      case "mouse_right":
        mouseRight(pos, a1);
        break;
      case "mouse_left":
        mouseLeft(pos, a1);
        break;
      case "draw_square":
        drawRectangle(pos, a1);
        break;
      case "draw_rectangle":
        drawRectangle(pos, a1, a2);
        break;
      case "draw_circle":
        drawCircle(pos, a1);
        break;
      case "prnt_scrn":
        const buffer = await printScreen();
        ws.send(`prnt_scrn ${buffer.split(";base64,")[1] || ""}`);
        break;
    }

    if (cmd !== "mouse_position" && cmd !== "prnt_scrn") {
      ws.send(cmd);
    }

    const buffer = await printScreen();
    ws.send(`prnt_scrn ${buffer.split(";base64,")[1] || ""}`);

    console.log(data.toString());
  });
});

wss.on("close", () => {
  //Close connection
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
