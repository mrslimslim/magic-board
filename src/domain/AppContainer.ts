class DIContainer {
  services = {}; // 用于存储服务定义
  buildingServices = new Set(); // 新增一个集合，用于跟踪正在构建的服务

  register(serviceName, definition, dependencies = []) {
    this.services[serviceName] = { definition, dependencies };
  }

  get(serviceName: string) {
    const service = this.services[serviceName];
    if (!service) {
      throw new Error(`Service ${serviceName} not found.`);
    }

    // 检测循环依赖
    if (this.buildingServices.has(serviceName)) {
      throw new Error(
        `Circular dependency detected for service: ${serviceName}`
      );
    }

    if (!service.instance) {
      this.buildingServices.add(serviceName); // 标记服务正在构建
      const dependencies = service.dependencies.map((dep) => this.get(dep));
      service.instance = service.definition(...dependencies);
      this.buildingServices.delete(serviceName); // 构建完成，移除标记
    }

    return service.instance;
  }
}

export default DIContainer;
