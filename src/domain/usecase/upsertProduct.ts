import Product from "../../models/product";

export interface IServiceUpsertProduct {
  getProductById(productId: string): Promise<Product>;
  id: string;
}
export interface IUpsertProductRepository {
  upsertProductByExternalId(productId: string, data: Product): Promise<Product>;
}
export default class UpsertProduct {
  readonly services: IServiceUpsertProduct[];
  repository: IUpsertProductRepository;
  constructor(
    services: IServiceUpsertProduct[],
    repository: IUpsertProductRepository
  ) {
    this.services = services;
    this.repository = repository;
  }

  async execute(productId: string, service: any = null): Promise<Product> {
    let resultRequest: Product;
    try {
      if (!service) {
        const handlers = this.services.map((item) =>
          item.getProductById(productId)
        );
        resultRequest = await Promise.any(handlers);
      } else {
        const handler = this.services.find((item) => item.id === service);
        if (handler) {
          resultRequest = await handler.getProductById(productId);
        } else {
          return Promise.reject(new Error(`not find service ${service}`));
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
    if (resultRequest) {
      try {
        const result = await this.repository.upsertProductByExternalId(
          productId,
          resultRequest
        );
        return result;
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(new Error(`Not find product/${productId}`));
    }
  }
}
