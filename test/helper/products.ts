import GetProduct from "../../src/external/service/getProduct";
import Product from "../../src/models/product";
import { categories } from "./categories";

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

export class GetProductServiceA extends GetProduct {
  data: any[] = products.filter((product) => product.origin === "A");
  constructor() {
    super("A");
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
export class GetProductServiceB extends GetProduct {
  data: any[] = products.filter((product) => product.origin === "B");

  constructor() {
    super("serviceB");
  }
  async getProductById(productId: string): Promise<Product> {
    const product = this.data.find((item) => item.ean === productId);
    if (!product) {
      return Promise.reject(new Error(`not find product ${productId}`));
    }
    return Promise.resolve(
      new Product({
        id_external: product.ean,
        st_product: product.name,
      })
    );
  }
}

export class ProductRepositoryInMemory {
  data: Product[] = [
    new Product({
      id_external: "9990001114445",
      fk_category: "1",
      st_product: "Bolacha vermelha",
      id: "1",
    }),
    new Product({
      id_external: "9990001113332",
      fk_category: "2",
      st_product: "Refrigerante Farto 2l",
      id: "2",
    }),
  ];
  async upsertProductByExternalId(productId: string, product: Product) {
    const oldProduct = this.data.find((item) => item.id_external === productId);
    if (!oldProduct) {
      return Promise.reject(`Not found product/${productId}`);
    }
    const category = product.fk_category
      ? product.fk_category
      : oldProduct.fk_category
      ? oldProduct.fk_category
      : "";
    let newProduct = new Product({
      id: oldProduct.id,
      id_external: productId,
      st_product: product?.st_product ?? oldProduct.st_product,
      dt_updated: new Date(),
      fk_category: category,
    });

    this.data.filter((item) => item.id_external !== productId);
    this.data.push(newProduct);
    return newProduct;
  }
}
