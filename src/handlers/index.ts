import robot from "robotjs";
import WebSocket from "ws";
import { drawCircle } from "../services/drawCircle";
import { drawRectangle } from "../services/drawRectangle";
import { mouseDown } from "../services/mouseDown";
import { mouseLeft } from "../services/mouseLeft";
import { mouseRight } from "../services/mouseRight";
import { mouseUp } from "../services/mouseUp";
import { printScreen } from "../services/printScreen";

export const wwsConnectionHandler = async (ws: WebSocket.WebSocket) => {
  console.log("Connection accepted");

  ws.on("message", async (data: Buffer) => {
    const [cmd, ...coords] = data.toString().split(" ");
    const a1 = Number(coords[0]) || 0;
    const a2 = Number(coords[1]) || 0;

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

    console.log(data.toString());
  });
};
