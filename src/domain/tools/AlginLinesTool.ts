import BaseTool from "./BaseTool";

class AlginLinesTool extends BaseTool {
  icon: string = "align-justify";
  displayName: string = "Align Lines";

  use(canvas: any, options: any) {
    let activeObject = canvas.getActiveObject();
    if (activeObject.type !== "line") {
      return;
    }

    let activeLine = activeObject;
    let activeLineCoords = activeLine.get("x1") + activeLine.get("y1");
    let lines = canvas.getObjects("line") as any[];
    let linesToAlign = lines.filter(
      (line) => line.get("x1") + line.get("y1") === activeLineCoords
    );

    let x1 = activeLine.get("x1");
    let y1 = activeLine.get("y1");
    let x2 = activeLine.get("x2");
    let y2 = activeLine.get("y2");

    linesToAlign.forEach((line) => {
      line.set("x1", x1);
      line.set("y1", y1);
      line.set("x2", x2);
      line.set("y2", y2);
    });

    canvas.renderAll();
  }
}

export default AlginLinesTool;
