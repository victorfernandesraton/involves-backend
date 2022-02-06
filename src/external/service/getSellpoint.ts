import SellPoint from "../../models/sellpoint";

export default abstract class GetSellPoint {
  constructor(readonly id: string) {}

  abstract getSellPointByCnpj(productId: string): Promise<SellPoint>;
  abstract getSellPointsByChain(chainUniqueName: string): Promise<SellPoint[]>;
}
