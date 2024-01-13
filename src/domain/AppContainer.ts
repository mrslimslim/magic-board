class DIContainer {
  services: any = {};
  constructor() {
    this.services = {};
  }

  register(serviceName: string, definition: any, dependencies: any[]) {
    this.services[serviceName] = { definition, dependencies };
  }

  get(serviceName: string) {
    const service = this.services[serviceName];
    if (!service) {
      throw new Error(`Service ${serviceName} not found.`);
    }

    if (!service.instance) {
      const dependencies = (service.dependencies || []).map((dep: any) =>
        this.get(dep)
      );
      service.instance = service.definition(...dependencies);
    }

    return service.instance;
  }
}

export default DIContainer;
