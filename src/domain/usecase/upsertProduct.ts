import Product from "../../models/product";

export default class UpsertProduct {
  readonly services: any[];
  constructor(services: any[]) {
    this.services = services;
  }

  async execute(productId: string, service: any = null): Promise<Product> {
    let result: Product;
    try {
      if (!service) {
        const handlers = this.services.map((item) =>
          item.getProduct(productId)
        );
        result = await Promise.any(handlers);
      } else {
        const handler = this.services.find((item) => item.id === service);
        if (handler) {
          result = await handler.getProduct(productId);
        } else {
          return Promise.reject(new Error(`not find service ${service}`));
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
    if (result) {
      return result;
    } else {
      return Promise.reject(new Error(`Not find product/${productId}`));
    }
  }
}
