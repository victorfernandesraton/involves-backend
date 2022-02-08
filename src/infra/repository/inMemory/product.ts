import Product from "../../../models/product";
import product from "../../../models/product";
import { IProductRepository, IProductRepositoryGetParams } from "../product";

export default class ProductRepositoryInMemory implements IProductRepository {
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

    this.data = this.data.filter((item) => item.id_external !== productId);
    this.data.push(newProduct);
    return newProduct;
  }
  getProducts = async (
    params: IProductRepositoryGetParams
  ): Promise<product[]> => {
    return this.data.filter((item) =>
      params.ean
        ? item.id_external === params.ean
        : true && params?.name
        ? item.st_product
            .toLowerCase()
            .includes(params?.name ? params.name?.toUpperCase() : "+")
        : true && params.id
        ? item.id === params.id
        : true
    );
  };
}
