import GetProduct from "../../src/external/service/getProduct";
import Product from "../../src/models/product";
import {
  products,
  GetProductServiceA,
  GetProductServiceB,
  ProductRepositoryInMemory,
} from "../helper/products";
import { categories } from "../helper/categories";
import ProductCategory from "../../src/models/productCategory";
import UpsertProduct from "../../src/domain/usecase/upsertProduct";

describe("upsertProduct", () => {
  const usecase = new UpsertProduct(
    [new GetProductServiceA(), new GetProductServiceB()],
    new ProductRepositoryInMemory()
  );
  test("should be a any data", async () => {
    const result = await usecase.execute("9990001114445");
    expect(result).toHaveProperty("st_product");
    expect(result.fk_category).toEqual("1");
  });
  test("should be product from specific service", async () => {
    const result = await usecase.execute("9990001114445", "serviceB");
    expect(result).toHaveProperty("st_product");
    expect(result.fk_category).toEqual("1");
    expect(result.st_product).toEqual("Biscoito recheada vermelha");
  });
  describe("errors", () => {
    test("should be not find product ", async () => {});
    test("should be not find product in specific service", async () => {});
  });
});
