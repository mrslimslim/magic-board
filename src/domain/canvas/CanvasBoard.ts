import { Canvas } from "fabric";

class CanvasBoard {
  width: number = 1000;
  height: number = 800;
  constructor() {
    this.init();
  }

  init() {
    const canvas = new Canvas("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.selection = false;
    canvas.hoverCursor = "pointer";
    canvas.backgroundColor = "#ffffff";
    canvas.renderAll();
  }
}

export default CanvasBoard;