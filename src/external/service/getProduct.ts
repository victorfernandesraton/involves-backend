import Product from "../../models/product";

export default abstract class GetProduct {
  constructor(readonly id: string) {}

  abstract getProductById(productId: string): Promise<Product>;
}
