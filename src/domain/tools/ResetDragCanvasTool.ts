import { fabric } from "fabric";
class ResetDragCanvasTool {
  icon: string = "reset-drag";
  displayName: string = "Reset Drag Canvas";
  name: string = "ResetDragCanvasTool";
  isInitiated: boolean = false;

  use(canvasContext: any, { eventManager }: any) {
    this.resetCanvas(canvasContext.canvas);
  }

  resetCanvas(canvas: any) {
    canvas.selection = true;
    canvas.forEachObject((object: any) => {
      object.selectable = true;
    });
    canvas.setCursor("default");
    canvas.isGrabMode = false;
  }
}

export default new ResetDragCanvasTool();
