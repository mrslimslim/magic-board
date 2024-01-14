interface ToolsInterface {
  registerTool(toolName: string | number, toolImplementation: any): void;
  selectTool(toolName: string | number): void;
  useCurrentTool(...args: any[]): void;
}

type Tool = { use: Function; icon: string; displayName: string; name: string };

class ToolsManager implements ToolsInterface {
  canvasContext: any;
  eventManager: any;
  permissionManager: any;
  pluginManager: any;
  tools: { [key: string]: Tool };
  currentTool: Tool | null;
  constructor(
    canvasContext: undefined,
    eventManager: undefined,
    permissionManager: undefined,
    pluginManager: undefined
  ) {
    this.canvasContext = canvasContext;
    this.eventManager = eventManager;
    this.permissionManager = permissionManager;
    this.pluginManager = pluginManager;
    this.tools = {};
    this.currentTool = null;
  }

  // 注册工具
  registerTool(toolName: string | number, toolImplementation: any) {
    if (this.tools[toolName]) {
      throw new Error(`Tool ${toolName} is already registered.`);
    }
    this.tools[toolName] = toolImplementation;
  }

  // 选择工具
  selectTool(toolName: string | number) {
    if (!this.permissionManager.checkPermission(toolName)) {
      throw new Error(`Permission denied for tool ${toolName}.`);
    }
    if (this.tools[toolName]) {
      this.currentTool = this.tools[toolName];
      console.log(`Tool selected: ${toolName}`);
    } else {
      throw new Error(`Tool ${toolName} not found.`);
    }
  }

  // 使用当前工具
  useCurrentTool(...args: any[]) {
    if (this.currentTool && typeof this.currentTool.use === "function") {
      this.currentTool.use(this.canvasContext, ...args);
      this.eventManager.publish("toolUsed", this.currentTool, ...args);
    } else {
      throw new Error("No tool selected or the selected tool is invalid.");
    }
  }

  getAvailableTools() {
    const userPermissions = this.permissionManager.getUserPermissions();
    const availableTools = userPermissions
      .filter((toolName: string | number) => this.tools[toolName]) // 确保工具已注册
      .map((toolName: string | number) => {
        const { name, icon, displayName } = this.tools[toolName];
        const toolReadytoCall = this.tools[toolName];
        return {
          name,
          icon, // 假设每个工具都有一个icon属性
          displayName, // 假设每个工具都有一个displayName属性
          useTool: (...args: any[]) => {
            if (typeof toolReadytoCall.use === "function") {
              toolReadytoCall.use(this.canvasContext, {
                eventManager: this.eventManager,
                pluginManager: this.pluginManager,
                ...args,
              });
              this.eventManager.publish("toolUsed", toolReadytoCall, ...args);
            } else {
              throw new Error(
                "No tool selected or the selected tool is invalid."
              );
            }
          },
        };
      });
    return availableTools;
  }
}

export default ToolsManager;
