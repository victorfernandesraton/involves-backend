import { GetProductAuditRepository } from "../../test/helper/products";
import Product from "../models/product";
import ProductCategory from "../models/productCategory";
import GetProduct from "./service/getProduct";

export const products = [
  {
    ean: "9990001114445",
    category: "Biscoito",
    name: "Bolacha recheada vermelha",
    brand: "Vermelha",
    origin: "A",
  },
  {
    ean: "9990001114445",
    name: "Biscoito recheada vermelha",
    brand: "Vermelha",
    timestemp: 1230004456,
    origin: "B",
  },
  {
    ean: "9990001113332",
    category: "Refrigerante",
    name: "Refrigerante Finta Sabor Cola 2l",
    origin: "A",
  },
];

export const categories = [
  new ProductCategory({
    id: "1",
    st_category: "Biscoito",
  }),
  new ProductCategory({
    id: "2",
    st_category: "Refrigerante",
  }),
];

export class GetProductServiceA extends GetProduct {
  data: any[] = products.filter((product) => product.origin === "A");
  constructor() {
    super({ id: "A", audit: new GetProductAuditRepository() });
  }
  async getProductById(productId: string): Promise<Product> {
    const product = this.data.find((item) => item.ean === productId);
    if (!product) {
      return Promise.reject(new Error(`not find product ${productId}`));
    }
    return Promise.resolve(
      new Product({
        fk_category: categories.find(
          (item) => item.st_category === product.category.toUpperCase()
        )?.id,
        id_external: product.ean,
        st_product: product.name,
      })
    );
  }
}
