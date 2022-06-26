import robotjs from "robotjs";
import { Pos } from "types/pos";

export const mouseRight = (pos: Pos, a1: number) => {
  robotjs.moveMouseSmooth(pos.x + a1, pos.y);
  pos.x = pos.x + a1;
};