import CanvasBoard from "./canvas/CanvasBoard";
import EventHandler from "./event/EventHandler";
import PermissionManager from "./permission/PermissionMananger";
import HistoryManager from "./history/HistoryManager";
import ToolManager from "./tools/ToolManager";
import PluginManager from "./plugin/PluginManager";
import AppContainer from "./AppContainer";
import { AddRectangleTool } from "./tools";

// AppContainer  是依赖注入的容器

function initApp(id: string) {
  const container = new AppContainer();
  container.register(
    "eventHandler",
    () => {
      return new EventHandler();
    },
    []
  );
  container.register(
    "permissionManager",
    () => {
      return new PermissionManager();
    },
    []
  );
  container.register(
    "historyManager",
    () => {
      return new HistoryManager();
    },
    []
  );

  container.register(
    "pluginManager",
    () => {
      return new PluginManager();
    },
    []
  );

  container.register(
    "toolManager",
    (
      canvas: any,
      eventHandler: any,
      permissionManager: any,
      pluginManager: any
    ) => {
      const toolManager = new ToolManager(
        canvas,
        eventHandler,
        permissionManager,
        pluginManager
      );
      toolManager.registerTool(AddRectangleTool.name, AddRectangleTool);
      return toolManager;
    },
    ["canvas", "eventHandler", "permissionManager", "pluginManager"]
  );
  container.register(
    "canvas",
    (historyManager: any, eventHandler: any, permissionManager: any) => {
      return new CanvasBoard({
        id,
        historyManager,
        eventHandler,
        permissionManager,
      });
    },
    ["historyManager", "eventHandler", "permissionManager"]
  );

  return container;
}

export default initApp;
