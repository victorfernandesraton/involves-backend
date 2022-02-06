import UpsertSellPointError from "../../src/domain/errors/upsertSellpointError";
import UpsertSellPoint from "../../src/domain/usecase/upsertSellpoint";
import { SellRepositoryInMemory } from "../helper/sell";
import SellPointRepositoryInMemory, {
  GetSellPointsServiceA,
  GetSellPointsServiceB,
} from "../helper/sellpoint";

describe("upsertCellpoint", () => {
  const usecase = new UpsertSellPoint({
    services: [new GetSellPointsServiceA(), new GetSellPointsServiceB()],
    repository: new SellPointRepositoryInMemory(),
  });
  test("should be a upsert a sellpoint", async () => {
    const result = await usecase.execute({ cnpj: "12345678910" });
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("st_sellpoint");
    expect(result[0].fk_sellpointchain).toEqual("1");
  });
  test("should be a upsert a sellpoint using specific service", async () => {
    const result = await usecase.execute(
      {
        cnpj: "10987654321",
      },
      "serviceB"
    );
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("st_sellpoint");
    expect(result[0].fk_sellpointchain).toEqual("2");
  });
  test("should be a upsert a sellpoint using chain", async () => {
    const result = await usecase.execute({ chain: "WALLMART" }, "serviceB");
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty("st_sellpoint");
    expect(result[1]).toHaveProperty("st_sellpoint");
    expect(result[0].fk_sellpointchain).toEqual("1");
    expect(result[1].fk_sellpointchain).toEqual("1");
  });
  describe("error", () => {
    test("should be a error when not find a cellpoint", async () => {
      try {
        const result = await usecase.execute({ cnpj: "21" });
      } catch (error) {
        expect(error).toBeInstanceOf(UpsertSellPointError);
      }
    });
    test("should be a error when not find a chain", async () => {
      try {
        const result = await usecase.execute({ chain: "21" });
      } catch (error) {
        expect(error).toBeInstanceOf(UpsertSellPointError);
      }
    });
    test("should be a error when not find a cellpoint in specific service", async () => {
      try {
        const result = await usecase.execute(
          {
            cnpj: "44433322211",
          },
          "serviceA"
        );
      } catch (error) {
        expect(error).toBeInstanceOf(UpsertSellPointError);
      }
    });
    test("should be a error when not find a cellpoint in specific service and chain", async () => {
      try {
        const result = await usecase.execute(
          {
            cnpj: "21",
            chain: "ATAKAREJO",
          },
          "serviceA"
        );
      } catch (error) {
        expect(error).toBeInstanceOf(UpsertSellPointError);
      }
    });
  });
});
