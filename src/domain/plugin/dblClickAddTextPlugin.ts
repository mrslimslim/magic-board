// 插件示例
import { fabric } from "fabric";
const myPlugin = {
  name: "DblClickAddTextPlugin",
  install({ canvas: canvasContext, eventManager, historyManager }) {
    // 插件安装逻辑，可以订阅事件、添加方法等
    // console.log("MyPlugin installed");
    eventManager.subscribe("dblclick", (e: any) => {
      console.log("dblclick", e);
      const { x, y } = e.pointer;
      const text = new fabric.IText("双击添加文字", {
        left: x,
        top: y,
        fontFamily: "sans-serif",
        fontSize: 20,
        fill: "black",
      });
      canvasContext.canvas.add(text);
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
