import { fabric } from "fabric";
class AddRectangleTool {
  icon: string = "rectangle";
  displayName: string = "Add Rectangle";
  name: string = "AddRectangleTool";

  use(canvasContext: any, options: any) {
    console.log("trigger AddRectangleTool");

    canvasContext.canvas.add(this.addRectangle());
    canvasContext.canvas.renderAll();
  }

  addRectangle() {
    return new fabric.Rect({
      left: 0,
      top: 0,
      width: 200,
      height: 200,
      fill: "transparent",
      stroke: "black",
    });
  }
}

export default new AddRectangleTool();
