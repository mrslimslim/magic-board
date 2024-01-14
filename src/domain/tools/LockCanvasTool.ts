class LockCanvasTool {
  icon: string = "lock";
  displayName: string = "Lock Canvas";
  name: string = "LockCanvasTool";

  use(canvasContext: any, options: any) {
    this.lockCanvas(canvasContext.canvas);
    canvasContext.canvas.renderAll();
  }

  lockCanvas(canvas: any) {
    canvas.selection = false;
    canvas.forEachObject((object: any) => {
      object.selectable = false;
    });
  }
}

export default new LockCanvasTool();
