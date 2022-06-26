import robotjs from "robotjs";
import { Pos } from "types/pos";
import { mouseRight } from "./mouseRight";
import { mouseDown } from "./mouseDown";
import { mouseUp } from "./mouseUp";
import { mouseLeft } from "./mouseLeft";

export const drawRectangle = (pos: Pos, a1: number, a2: number = 0) => {
  if (a2 === 0) {
    a2 = a1;
  }

  robotjs.mouseToggle("down");
  mouseRight(pos, a2);
  mouseDown(pos, a1);
  mouseLeft(pos, a2);
  mouseUp(pos, a1);
  robotjs.mouseToggle("up");
};
