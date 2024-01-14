import { fabric } from "fabric";
class DragCanvasTool {
  icon: string = "drag";
  displayName: string = "Drag Canvas";
  name: string = "DragCanvasTool";
  isInitiated: boolean = false;

  use(canvasContext: any, { eventManager }: any) {
    if (!this.isInitiated) {
      this.initEventOnce(canvasContext.canvas, eventManager);
      this.isInitiated = true;
    }
  }

  initEventOnce(canvas: any, eventManager: any) {
    this.mouseDownDragCanvas(canvas, eventManager);
    this.mouseDownDragCanvasMove(canvas, eventManager);
    this.mouseUpDragCanvas(canvas, eventManager);
  }

  mouseDownDragCanvas(canvas: any, eventManager: any) {
    // 鼠标按下，且移动，才会触发
    eventManager.subscribe("mouseDown", (event: any) => {
      console.log("MOUSE DOWN");
      this.handleMouseDownDragCanvas(event, canvas, eventManager);
    });
  }

  handleMouseDownDragCanvas(event, canvas) {
    if (event.target) {
      return;
    }
    canvas.selection = false;
    canvas.forEachObject((object: any) => {
      object.selectable = false;
    });
    canvas.setCursor("grab");
    canvas.isGrabMode = true;
  }

  mouseDownDragCanvasMove(canvas: any, eventManager: any) {
    // 鼠标按下，且移动，才会触发
    eventManager.subscribe("mouseMove", (event: any) => {
      this.handleMouseDownDragCanvasMove(event, canvas, eventManager);
    });
  }

  handleMouseDownDragCanvasMove(event, canvas, eventManager) {
    if (canvas.isGrabMode) {
      canvas.setCursor("grabbing");
      console.log("event.e.movementX", event.e.movementX);
      console.log("event.e.movementY", event.e.movementY);
      // slow down the movement
      const movementX = event.e.movementX;
      const movementY = event.e.movementY;
      canvas.relativePan(new fabric.Point(movementX, movementY));
    }
  }

  mouseUpDragCanvas(canvas: any, eventManager: any) {
    // 鼠标按下，且移动，才会触发
    eventManager.subscribe("mouseUp", (event: any) => {
      console.log("MOUSE UP");
      this.handleMouseUpDragCanvas(event, canvas, eventManager);
    });
  }

  handleMouseUpDragCanvas(event, canvas, eventManager) {
    canvas.isGrabMode = false;
    canvas.setCursor("default");
    canvas.selection = true;
    canvas.forEachObject((object: any) => {
      object.selectable = true;
    });
  }

  offEvent(canvas: any, eventManager: any) {
    eventManager.unsubscribe("mouseDown", this.handleMouseDownDragCanvas);
    eventManager.unsubscribe("mouseMove", this.handleMouseDownDragCanvasMove);
    eventManager.unsubscribe("mouseUp", this.handleMouseUpDragCanvas);
    canvas.isGrabMode = false;
    canvas.setCursor("default");
  }
}

export default new DragCanvasTool();
