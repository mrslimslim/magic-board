import { Canvas } from "fabric";

class CanvasBoard {
  width: number = 1000;
  height: number = 800;
  canvas: any;
  canvasId: string;
  eventHandler: any;
  historyManager: any;

  constructor({
    id,
    historyManager,
    eventHandler,
  }: {
    id: string;
    historyManager: any;
    eventHandler: any;
    permissionManager: any;
  }) {
    this.canvas = null;
    this.canvasId = id;
    this.eventHandler = eventHandler;
    this.historyManager = historyManager;
    this.init();
    this.initEvent();
  }

  init() {
    const canvas = new Canvas(this.canvasId);
    console.log("this.canvasId", this.canvasId);
    canvas.width = this.width;
    canvas.height = this.height;
    this.canvas = canvas;
    canvas.renderAll();
  }

  initEvent() {
    console.log("this.canvas", this.canvas.on);
    this.canvas.on("object:modified", (e: any) => {
      this.eventHandler.publish("objectModified", e.target);
    });
    this.canvas.on("object:removed", (e: any) => {
      this.eventHandler.publish("objectRemoved", e.target);
    });
    this.canvas.on("object:rotating", (e: any) => {
      this.eventHandler.publish("objectRotating", e.target);
    });
    this.canvas.on("object:scaling", (e: any) => {
      this.eventHandler.publish("objectScaling", e.target);
    });
    this.canvas.on("object:moving", (e: any) => {
      this.eventHandler.publish("objectMoving", e.target);
    });
    this.canvas.on("object:skewing", (e: any) => {
      this.eventHandler.publish("objectSkewing", e.target);
    });
    this.canvas.on("mouse:down", (e: any) => {
      this.eventHandler.publish("mouseDown", e);
    });
    this.canvas.on("mouse:move", (e: any) => {
      this.eventHandler.publish("mouseMove", e);
    });
    this.canvas.on("mouse:up", (e: any) => {
      this.eventHandler.publish("mouseUp", e);
    });
    this.canvas.on("mouse:over", (e: any) => {
      this.eventHandler.publish("mouseOver", e);
    });
    this.canvas.on("mouse:out", (e: any) => {
      this.eventHandler.publish("mouseOut", e);
    });
    this.canvas.on("selection:created", (e: any) => {
      this.eventHandler.publish("selectionCreated", e.target);
    });
    this.canvas.on("selection:updated", (e: any) => {
      this.eventHandler.publish("selectionUpdated", e.target);
    });
    this.canvas.on("selection:cleared", (e: any) => {
      this.eventHandler.publish("selectionCleared", e.target);
    });
    this.canvas.on("event:dragover", (e: any) => {
      this.eventHandler.publish("dragover", e.target);
    });
    this.canvas.on("event:drop", (e: any) => {
      this.eventHandler.publish("drop", e.target);
    });
    this.canvas.on("event:dragenter", (e: any) => {
      this.eventHandler.publish("drop", e.target);
    });
    this.canvas.on("event:dragleave", (e: any) => {
      this.eventHandler.publish("drop", e.target);
    });
    this.canvas.on("after:render", (e: any) => {
      this.eventHandler.publish("afterRender", e.target);
    });
    this.canvas.on("before:render", (e: any) => {
      this.eventHandler.publish("beforeRender", e.target);
    });
  }
}

export default CanvasBoard;
