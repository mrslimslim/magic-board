class UnlockCanvasTool {
  icon: string = "unlock";
  displayName: string = "Unlock Canvas";
  name: string = "UnlockCanvasTool";

  use(canvasContext: any, options: any) {
    this.unlockCanvas(canvasContext.canvas);
    canvasContext.canvas.renderAll();
  }

  unlockCanvas(canvas: any) {
    canvas.selection = true;
    canvas.forEachObject((object: any) => {
      object.selectable = true;
    });
  }
}

export default new UnlockCanvasTool();
