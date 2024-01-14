// 插件示例
import { fabric } from "fabric";
const myPlugin = {
  name: "DblClickAddTextPlugin",
  install({ canvasContext, eventManager, historyManager }) {
    // 插件安装逻辑，可以订阅事件、添加方法等
    // console.log("MyPlugin installed");
    eventManager.subscribe("dblclick", (e: any) => {
      // const { x, y } = e.pointer;
      // const text = new fabric.IText("双击添加文字", {
      //   left: x,
      //   top: y,
      //   fontFamily: "sans-serif",
      //   fontSize: 20,
      //   fill: "black",
      // });
      // canvasContext.canvas.add(text);
      // 是否双击的时候，点击对象
      //如果有对象，在对象的中央添加文字,并获取焦点
      //如果没有对象，添加文字
      if (e.target) {
        const { width, height, left, top } = e.target;
        const text = new fabric.IText("123", {
          left: left + width / 2,
          top: top + height / 2,
          fontFamily: "sans-serif",
          fontSize: 20,
          fill: "black",
        });
        canvasContext.canvas.add(text);
        text.bringToFront();
        text.enterEditing();
      } else {
        const { x, y } = e.pointer;
        const text = new fabric.IText("123", {
          left: x,
          top: y,
          fontFamily: "sans-serif",
          fontSize: 20,
          fill: "black",
        });
        canvasContext.canvas.add(text);
        text.bringToFront();
        text.enterEditing();
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
