import { fabric } from "fabric";

class CanvasBoard {
  width: number = 1000;
  height: number = 800;
  canvas: any;
  canvasId: string;
  eventManager: any;
  historyManager: any;

  constructor({
    id,
    historyManager,
    eventManager,
  }: {
    id: string;
    historyManager: any;
    eventManager: any;
    permissionManager: any;
  }) {
    this.canvas = null;
    this.canvasId = id;
    this.eventManager = eventManager;
    this.historyManager = historyManager;
    this.initCanvas();
    this.initEvent();
  }

  initCanvas() {
    const canvas = new fabric.Canvas(this.canvasId);
    this.canvas = canvas;
  }

  initEvent() {
    this.canvas.on("object:modified", (e: any) => {
      this.eventManager.publish("objectModified", e.target);
    });
    this.canvas.on("object:removed", (e: any) => {
      this.eventManager.publish("objectRemoved", e.target);
    });
    this.canvas.on("object:rotating", (e: any) => {
      this.eventManager.publish("objectRotating", e.target);
    });
    this.canvas.on("object:scaling", (e: any) => {
      this.eventManager.publish("objectScaling", e.target);
    });
    this.canvas.on("object:moving", (e: any) => {
      this.eventManager.publish("objectMoving", e.target);
    });
    this.canvas.on("object:skewing", (e: any) => {
      this.eventManager.publish("objectSkewing", e.target);
    });
    this.canvas.on("mouse:down", (e: any) => {
      this.eventManager.publish("mouseDown", e);
    });
    this.canvas.on("mouse:move", (e: any) => {
      this.eventManager.publish("mouseMove", e);
    });
    this.canvas.on("mouse:up", (e: any) => {
      this.eventManager.publish("mouseUp", e);
    });
    this.canvas.on("mouse:over", (e: any) => {
      this.eventManager.publish("mouseOver", e);
    });
    this.canvas.on("mouse:out", (e: any) => {
      this.eventManager.publish("mouseOut", e);
    });
    this.canvas.on("selection:created", (e: any) => {
      this.eventManager.publish("selectionCreated", e.target);
    });
    this.canvas.on("selection:updated", (e: any) => {
      this.eventManager.publish("selectionUpdated", e.target);
    });
    this.canvas.on("selection:cleared", (e: any) => {
      this.eventManager.publish("selectionCleared", e.target);
    });
    this.canvas.on("event:dragover", (e: any) => {
      this.eventManager.publish("dragover", e.target);
    });
    this.canvas.on("event:drop", (e: any) => {
      this.eventManager.publish("drop", e.target);
    });
    this.canvas.on("event:dragenter", (e: any) => {
      this.eventManager.publish("drop", e.target);
    });
    this.canvas.on("event:dragleave", (e: any) => {
      this.eventManager.publish("drop", e.target);
    });
    this.canvas.on("after:render", (e: any) => {
      this.eventManager.publish("afterRender", e.target);
    });
    this.canvas.on("before:render", (e: any) => {
      this.eventManager.publish("beforeRender", e.target);
    });
    // add dblclick event
    this.canvas.on("mouse:dblclick", (e: any) => {
      this.eventManager.publish("dblclick", e);
    });
  }
}

export default CanvasBoard;
