import Jimp from "jimp";
import robotjs from "robotjs";

export const printScreen = async () => {
  const { x, y } = robotjs.getMousePos();
  const bitmap = robotjs.screen.capture(x, y, 200, 200);
  const image = new Jimp({
    data: bitmap.image,
    width: bitmap.width,
    height: bitmap.height,
  });
  return await image.getBase64Async(Jimp.MIME_PNG);
};
