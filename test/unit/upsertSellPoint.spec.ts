import UpsertSellPoint from "../../src/domain/usecase/upsertSellpoint";

describe("upsertCellpoint", () => {
  const usecase = new UpsertSellPoint();
  test("should be a upsert a sellpoint", async () => {
    const result = await usecase.execute({ cnpj: "12345678910" });
    expect(result).toHaveProperty("st_sellpoint");
    expect(result.fk_sellpointchain).toEqual("1");
  });
  test.todo("should be a upsert a sellpoint using specific service");
  describe("error", () => {
    test.todo("should be a error when not find a cellpoint");
    test.todo(
      "should be a error when not find a cellpoint in specific service"
    );
  });
});
