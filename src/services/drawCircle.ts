import robotjs from "robotjs";
import { Pos } from "types/pos";

export const drawCircle = (pos: Pos, a1: number) => {
  robotjs.mouseToggle("down");
  const step = 0.01 * Math.PI;
  for (let i = 0; i <= Math.PI * 2; i += step) {
    robotjs.moveMouseSmooth(pos.x + a1 * Math.cos(i) - a1, pos.y + a1 * Math.sin(i));
  }
  robotjs.mouseToggle("up");
  robotjs.moveMouse(pos.x, pos.y);
};
