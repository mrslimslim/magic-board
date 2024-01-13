interface PluginManagerInterface {
  loadPlugin(pluginName: string | number, plugin: any): void;
  unloadPlugin(pluginName: any): void;
  getPlugin(pluginName: any): any;
  executePluginMethod(pluginName: any, methodName: any, ...args: any[]): any;
}

class PluginManager implements PluginManagerInterface {
  plugins: any;
  constructor() {
    this.plugins = {};
  }

  // 加载插件
  loadPlugin(pluginName: string | number, plugin: any) {
    if (this.plugins[pluginName]) {
      throw new Error(`Plugin ${pluginName} is already loaded.`);
    }
    this.plugins[pluginName] = plugin;
    if (typeof plugin.install === "function") {
      plugin.install(this);
    }
  }

  // 卸载插件
  unloadPlugin(pluginName: string | number) {
    const plugin = this.plugins[pluginName];
    if (plugin && typeof plugin.uninstall === "function") {
      plugin.uninstall(this);
    }
    delete this.plugins[pluginName];
  }

  // 获取插件
  getPlugin(pluginName: string | number) {
    return this.plugins[pluginName];
  }

  // 执行插件方法
  executePluginMethod(
    pluginName: any,
    methodName: string | number,
    ...args: any[]
  ) {
    const plugin = this.getPlugin(pluginName);
    if (plugin && typeof plugin[methodName] === "function") {
      return plugin[methodName](...args);
    }
    throw new Error(`Method ${methodName} not found in plugin ${pluginName}`);
  }
}
