import Entity from "./entity";

export interface ISellpointChainParams extends Entity {
  st_sellpointchain: string;
}
export default class SellpointChain extends Entity {
  st_sellpointchain: string;
  st_unique_name: string;
  constructor(params: ISellpointChainParams) {
    super(params);
    this.st_sellpointchain = params.st_sellpointchain;
    this.st_unique_name = params.st_sellpointchain
      .toUpperCase()
      .replaceAll(" ", "_");
  }
}
