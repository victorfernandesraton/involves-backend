import SellpointChain from "../../models/sellpointChain";

export default interface ISellpointChainRepository {
  getSellpointChainByUniqueName(
    chainUniqueName: string
  ): Promise<SellpointChain>;
  getSellpointChainById(chainId: string): Promise<SellpointChain>;
  insertSellpointChain(sellpointChain: SellpointChain): Promise<SellpointChain>;
}
