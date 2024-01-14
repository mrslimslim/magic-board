import CanvasBoard from "./canvas/CanvasBoard";
import PermissionManager from "./permission/PermissionMananger";
import HistoryManager from "./history/HistoryManager";
import ToolManager from "./tools/ToolManager";
import PluginManager from "./plugin/PluginManager";
import HotkeysManager from "./hotkeys/HotKeysManager";
import AppContainer from "./AppContainer";
import eventManager from "./event/eventManager";

import * as tools from "./tools";
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
    "HotkeysManager",
    (canvasContext: any) => {
      console.log("ssssss");
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
      pluginManager.loadPlugin(
        dblClickAddTextPlugin.name,
        dblClickAddTextPlugin
      );
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
      // toolManager.registerTool(AddRectangleTool.name, AddRectangleTool);
      // toolManager.registerTool(AddLineTool.name, AddLineTool);
      // toolManager.registerTool(LockCanvasTool.name, LockCanvasTool);
      // toolManager.registerTool(UnlockCanvasTool.name, UnlockCanvasTool);

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
