class eventManager {
  listeners: any;
  constructor() {
    this.listeners = {};
  }

  // 订阅事件
  subscribe(eventType, callback) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    const listenerArray = this.listeners[eventType];
    listenerArray.push(callback);
    // 返回一个解绑函数
    return () => {
      const index = listenerArray.indexOf(callback);
      if (index > -1) {
        listenerArray.splice(index, 1);
      }
    };
  }

  // 发布事件
  publish(eventType, ...args) {
    const listenerArray = this.listeners[eventType];
    if (listenerArray) {
      listenerArray.forEach((callback) => {
        callback(...args);
      });
    }
  }

  // 解绑所有事件监听器
  clear() {
    this.listeners = {};
  }
}

export default eventManager;
