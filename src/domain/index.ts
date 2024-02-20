import CanvasBoard from "./canvas/CanvasBoard";
import PermissionManager from "./permission/PermissionMananger";
import HistoryManager from "./history/HistoryManager";
import ToolManager from "./tools/ToolManager";
import PluginManager from "./plugin/PluginManager";
import HotkeysManager from "./hotkeys/HotKeysManager";
import eventManager from "./event/EventManager";
import AppContainer from "./AppContainer";

import * as tools from "./tools";
import * as plugins from "./plugin";

// AppContainer  是依赖注入的容器

function initApp(id: string) {
  const container = new AppContainer();

  container.register(
    "eventManager",
    () => {
      return new eventManager();
    },
    []
  );

  container.register(
    "permissionManager",
    () => {
      return new PermissionManager();
    },
    ["eventManager"]
  );

  container.register(
    "historyManager",
    () => {
      return new HistoryManager();
    },
    ["eventManager"]
  );

  container.register(
    "HotkeysManager",
    (canvasContext: any) => {
      return new HotkeysManager(canvasContext);
    },
    ["canvasContext"]
  );

  container.register(
    "pluginManager",
    (eventManager: any, historyManager: any, canvasContext: any) => {
      const pluginManager = new PluginManager({
        eventManager,
        historyManager,
        canvasContext,
      });
      Object.keys(plugins).forEach((pluginName) => {
        const plugin = plugins[pluginName];
        pluginManager.loadPlugin(plugin.name, plugins[pluginName]);
      });
      return pluginManager;
    },
    ["eventManager", "historyManager", "canvasContext"]
  );

  container.register(
    "toolManager",
    (
      canvasContext: any,
      eventManager: any,
      permissionManager: any,
      pluginManager: any
    ) => {
      const toolManager = new ToolManager(
        canvasContext,
        eventManager,
        permissionManager,
        pluginManager
      );
      // map tools
      Object.keys(tools).forEach((toolName) => {
        toolManager.registerTool(toolName, tools[toolName]);
      });
      return toolManager;
    },
    ["canvasContext", "eventManager", "permissionManager", "pluginManager"]
  );

  container.register(
    "canvasContext",
    (historyManager: any, eventManager: any, permissionManager: any) => {
      return new CanvasBoard({
        id,
        historyManager,
        eventManager,
        permissionManager,
      });
    },
    ["historyManager", "eventManager", "permissionManager"]
  );

  return container;
}

export default initApp;
