import robotjs from "robotjs";
import { Pos } from "types/pos";

export const mouseDown = (pos: Pos, a1: number) => {
  robotjs.moveMouseSmooth(pos.x, pos.y + a1);
  pos.y = pos.y + a1;
};