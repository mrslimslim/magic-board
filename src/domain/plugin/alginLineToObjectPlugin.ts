import { fabric } from "fabric";
const plugin = {
  name: "AlignLineToObjectPlugin",
  snap: 5, // 对齐的阈值
  install({ canvasContext, eventManager, historyManager }: any) {
    console.log("AlignLineToObjectPlugin installed");
    eventManager.subscribe("objectMoving", (e: any) => {
      this.alignLineToObjectWhileMoving(canvasContext.canvas);
    });
  },
  uninstall() {},
  alignLineToObjectWhileMoving(canvas) {
    const activeObject = canvas.getActiveObject();
    const activeGroup = canvas.getActiveObjects();
    if (!activeObject && !activeGroup) return;
    // 获取当前选中的对象 的 左上，右上，左下，右下 左中，右中，上中，下中，中心点
    const targetPointPlaces = [
      ["left", "top"],
      ["right", "top"],
      ["left", "bottom"],
      ["right", "bottom"],
      ["left", "center"],
      ["right", "center"],
      ["center", "top"],
      ["center", "bottom"],
      ["center", "center"],
    ];
    // 获取坐标
    const targetPoints = targetPointPlaces.map((place) => {
      return activeObject.getPointByOrigin(...place);
    });

    // 其他对象
    const otherObjects = canvas.getObjects().filter((object) => {
      return object !== activeObject;
    });

    // 获取其他对象的targetPointPlaces
    const otherObjectsTargetPoints = otherObjects.map((object) => {
      return targetPointPlaces.map((place) => {
        return object.getPointByOrigin(...place);
      });
    });
    // 对比 在snap范围内的点，并划线
  },
};

export default plugin;
