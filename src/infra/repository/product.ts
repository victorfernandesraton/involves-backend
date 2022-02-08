import Product from "../../models/product";

export interface IProductRepositoryGetParams {
  name?: string;
  id?: string;
  ean?: string;
}
export interface IProductRepository {
  upsertProductByExternalId(productId: string, data: Product): Promise<Product>;
  getProducts(params: IProductRepositoryGetParams): Promise<Product[]>;
}
