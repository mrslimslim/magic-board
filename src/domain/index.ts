import CanvasBoard from "./canvas/CanvasBoard";
import eventManager from "./event/eventManager";
import PermissionManager from "./permission/PermissionMananger";
import HistoryManager from "./history/HistoryManager";
import ToolManager from "./tools/ToolManager";
import PluginManager from "./plugin/PluginManager";
import AppContainer from "./AppContainer";
import { AddRectangleTool, AddLineTool } from "./tools";
import { dblClickAddTextPlugin } from "./plugin";
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
    (eventManager: any, historyManager: any, canvas: any) => {
      const pluginManager = new PluginManager({
        eventManager,
        historyManager,
        canvas,
      });
      pluginManager.loadPlugin(
        dblClickAddTextPlugin.name,
        dblClickAddTextPlugin
      );
      return pluginManager;
    },
    ["eventManager", "historyManager", "canvas"]
  );

  container.register(
    "toolManager",
    (
      canvas: any,
      eventManager: any,
      permissionManager: any,
      pluginManager: any
    ) => {
      const toolManager = new ToolManager(
        canvas,
        eventManager,
        permissionManager,
        pluginManager
      );
      toolManager.registerTool(AddRectangleTool.name, AddRectangleTool);
      toolManager.registerTool(AddLineTool.name, AddLineTool);
      return toolManager;
    },
    ["canvas", "eventManager", "permissionManager", "pluginManager"]
  );
  container.register(
    "canvas",
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
