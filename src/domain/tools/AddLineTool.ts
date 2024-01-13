import { fabric } from "fabric";
class AddLineTool {
  icon: string = "line";
  displayName: string = "Add Line";
  name: string = "AddLineTool";

  use(canvasContext: any, options: any) {
    canvasContext.canvas.add(this.addLine());
    canvasContext.canvas.renderAll();
  }

  addLine() {
    return new fabric.Line([50, 100, 200, 200], {
      left: 0,
      top: 0,
      stroke: "black",
    });
  }
}

export default new AddLineTool();
