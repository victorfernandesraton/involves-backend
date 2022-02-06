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
    expect(result).toHaveLength(1);
    expect(result[0].dt_register).toEqual(new Date("2019-01-10"));
    expect(result[0].fk_product).toEqual("1");
    expect(result[0].fk_sellpoint).toEqual("1");
  });
  test("should be insert multiple sells", async () => {
    const result = await usecase.execute([
      {
        product: productRepository.data[0],
        sellpoint: sellpointRepository.data[0],
        value: 55,
        date: new Date("2019-01-10"),
      },
      {
        product: productRepository.data[1],
        sellpoint: sellpointRepository.data[1],
        value: 55,
        date: new Date("2022-01-10"),
      },
    ]);
    expect(result).toHaveLength(2);
    expect(result[0].dt_register).toEqual(new Date("2019-01-10"));
    expect(result[0].fk_sellpoint).toEqual("1");
    expect(result[1].dt_register).toEqual(new Date("2022-01-10"));
    expect(result[1].fk_sellpoint).toEqual("2");
  });
  test("should be insert sell without date", async () => {
    const result = await usecase.execute([
      {
        product: productRepository.data[0],
        sellpoint: sellpointRepository.data[0],
        value: 55,
      },
    ]);
    expect(result).toHaveLength(1);
    expect(result[0].dt_register).toBeInstanceOf(Date);
    expect(result[0].fk_product).toEqual("1");
    expect(result[0].fk_sellpoint).toEqual("1");
  });
});
