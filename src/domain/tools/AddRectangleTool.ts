import { fabric } from "fabric";
class AddRectangleTool {
  icon: string = "rectangle";
  displayName: string = "Add Rectangle";
  name: string = "AddRectangleTool";

  use(canvasContext: any, options: any) {
    this.addRectangleToViewCenter(canvasContext.canvas);
  }
  // 添加到画布中心, 排除pan的影响
  addRectangleToViewCenter(canvas) {
    const rect = new fabric.Rect({
      width: 200,
      height: 200,
      fill: "transparent",
      stroke: "black",
    });
    canvas.add(rect);
    rect.center();
    canvas.renderAll();
  }
}

export default new AddRectangleTool();
