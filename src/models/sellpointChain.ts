import Entity from "./entity";

export interface ISellpointChainParams extends Entity {
  st_sellpointchain: string;
}
export default class SellpointChain extends Entity {
  st_sellpointchain: string;
  constructor(params: ISellpointChainParams) {
    super(params);
    this.st_sellpointchain = params.st_sellpointchain;
  }
}
