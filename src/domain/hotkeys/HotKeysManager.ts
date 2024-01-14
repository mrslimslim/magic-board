import { hotkeys } from "./hotkeys";

class HotkeysManager {
  canvasContext = {};
  copiedObject = {};
  constructor(canvasContext: any) {
    this.canvasContext = canvasContext;
    this.copiedObject = { current: null }; // 使用对象来保持引用
    this.init();
  }

  // 初始化热键事件监听
  init() {
    document.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  // 清理热键事件监听
  destroy() {
    document.removeEventListener("keydown", this.handleKeydown.bind(this));
  }

  // 处理按键事件
  handleKeydown(event: {
    ctrlKey: any;
    metaKey: any;
    key: string | number;
    preventDefault: () => void;
  }) {
    console.log("handleKeydown", event);
    const keyCombination =
      (event.ctrlKey || event.metaKey ? "Ctrl+" : "") + event.key;
    console.log("keyCombination", keyCombination);
    const action = hotkeys[keyCombination];
    if (action) {
      event.preventDefault(); // 阻止默认行为
      action(this.canvasContext, this.copiedObject);
    }
  }
}

export default HotkeysManager;
