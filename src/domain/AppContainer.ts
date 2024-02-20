class DIContainer {
  services = {};
  buildingServices = new Map();
  loadingTimes = new Map(); // 新增一个Map来存储每个服务的加载时间

  register(serviceName: string, definition: any, dependencies: string[] = []) {
    this.services[serviceName] = { definition, dependencies, instance: null };
  }

  get(serviceName: string): Promise<any> {
    const service = this.services[serviceName];
    if (!service) {
      return Promise.reject(new Error(`Service ${serviceName} not found.`));
    }

    if (this.buildingServices.has(serviceName)) {
      return this.buildingServices.get(serviceName);
    }

    if (service.instance) {
      return Promise.resolve(service.instance);
    }

    const startTime = performance.now(); // 记录开始构建的时间

    const dependenciesPromises = service.dependencies.map((dep) =>
      this.get(dep)
    );
    const instancePromise = Promise.all(dependenciesPromises)
      .then((dependencies) => service.definition(...dependencies))
      .then((instance) => {
        service.instance = instance;
        this.buildingServices.delete(serviceName);

        const endTime = performance.now(); // 记录构建完成的时间
        const loadingTime = endTime - startTime; // 计算加载时间
        console.log(`${serviceName} 加载时间: ${loadingTime}ms`);
        this.loadingTimes.set(serviceName, loadingTime); // 存储加载时间

        return instance;
      });

    this.buildingServices.set(serviceName, instancePromise);
    return instancePromise;
  }

  // 新增方法来获取指定服务的加载时间
  getLoadingTime(serviceName: string): number | undefined {
    return this.loadingTimes.get(serviceName);
  }
}

export default DIContainer;
