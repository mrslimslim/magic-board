// 插件示例
import { fabric } from "fabric";
const myPlugin = {
  name: "DblClickAddTextPlugin",
  install({ canvasContext, eventManager, historyManager }) {
    eventManager.subscribe("dblclick", (e: any) => {
      if (e.target && e.target.type !== "textbox") {
        const { width, height, left, top } = e.target;
        const text = new fabric.Textbox("123", {
          left: left + width / 2,
          top: top + height / 2,
          fontFamily: "sans-serif",
          fontSize: 20,
          fill: "black",
        });
        canvasContext.canvas.add(text);
        text.bringToFront();
      } else {
        const { x, y } = e.pointer;
        const text = new fabric.Textbox("123", {
          left: x,
          top: y,
          fontFamily: "sans-serif",
          fontSize: 20,
          fill: "black",
        });
        canvasContext.canvas.add(text);
        text.bringToFront();
      }
    });
  },
  uninstall(pluginManager: any) {
    // 插件卸载逻辑，应该清理所有插件所做的修改
    console.log("MyPlugin uninstalled");
  },
  enhanceCanvas(canvas: any) {
    // 增强Canvas的功能
    console.log("Canvas has been enhanced by MyPlugin");
  },
};

export default myPlugin;
