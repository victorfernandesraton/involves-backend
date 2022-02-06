import UpsertSellPoint from "../../src/domain/usecase/upsertSellpoint";
import {
  GetSellPointsServiceA,
  GetSellPointsServiceB,
} from "../helper/sellpoint";

describe("upsertCellpoint", () => {
  const usecase = new UpsertSellPoint({
    services: [new GetSellPointsServiceA(), new GetSellPointsServiceB()],
  });
  test("should be a upsert a sellpoint", async () => {
    const result = await usecase.execute({ cnpj: "12345678910" });
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("st_sellpoint");
    expect(result[0].fk_sellpointtype).toEqual("1");
  });
  test.todo("should be a upsert a sellpoint using specific service");
  test("should be a upsert a sellpoint using chain", async () => {
    const result = await usecase.execute({ chain: "WALLMART" }, "serviceB");
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty("st_sellpoint");
    expect(result[1]).toHaveProperty("st_sellpoint");
    expect(result[0].fk_sellpointtype).toEqual("1");
    expect(result[1].fk_sellpointtype).toEqual("2");
  });
  describe("error", () => {
    test.todo("should be a error when not find a cellpoint");
    test.todo(
      "should be a error when not find a cellpoint in specific service"
    );
  });
});