// 插件示例
const myPlugin = {
  name: "MyPlugin",
  install(pluginManager: any) {
    // 插件安装逻辑，可以订阅事件、添加方法等
    console.log("MyPlugin installed");
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
