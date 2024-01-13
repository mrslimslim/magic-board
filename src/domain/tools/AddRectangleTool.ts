import BaseTool from "./BaseTool";
import { Rect } from "fabric";
class AddRectangleTool extends BaseTool {
  icon: string = "rectangle";
  displayName: string = "Add Rectangle";
  name: string = "AddRectangleTool";

  private use(canvasContext: any, options: any) {
    console.log("trigger");

    canvasContext.canvas.add(
      new Rect({
        left: 0,
        top: 0,
        fill: "blue",
        width: 200,
        height: 200,
      })
    );

    canvasContext.canvas.renderAll();
  }
}

export default new AddRectangleTool();
