import InsertSell from "../../src/domain/usecase/insertSell";
import { ProductRepositoryInMemory } from "../helper/products";
import { SellRepositoryInMemory } from "../helper/sell";
import SellPointRepositoryInMemory from "../helper/sellpoint";

describe("InsertSell", () => {
  const productRepository = new ProductRepositoryInMemory();
  const sellpointRepository = new SellPointRepositoryInMemory();
  const usecase = new InsertSell({
    repository: new SellRepositoryInMemory(),
  });
  test("should be insert a simple sell", async () => {
    const result = await usecase.execute([
      {
        product: productRepository.data[0],
        sellpoint: sellpointRepository.data[0],
        value: 55,
        date: new Date("2019-01-10"),
      },
    ]);
    expect(result[0].dt_register).toEqual(new Date("2019-01-10"));
  });
  test.todo("should be insert multiple sells");
});
