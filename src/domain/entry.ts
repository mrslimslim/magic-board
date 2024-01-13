import CanvasBoard from "./canvas/CanvasBoard";
import EventHandler from "./event/EventHandler";
import PermissionManager from "./permission/PermissionMananger";
import HistoryManager from "./history/HistoryManager";
import ToolManager from "./tools/ToolManager";
import AppContainer from "./AppContainer";

// AppContainer  是依赖注入的容器

function initApp() {
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
    ["canvas"]
  );
  container.register(
    "toolManager",
    () => {
      return new ToolManager();
    },
    []
  );
  container.register(
    "canvas",
    (historyManager: any, eventHandler: any, permissionManager: any) => {
      return new CanvasBoard({
        historyManager,
        eventHandler,
        permissionManager,
      });
    },
    ["historyManager", "eventHandler", "permissionManager"]
  );

  return container;
}

export const container = initApp();
