import Entity from "./entity";

export interface ISellpointTypeParams extends Entity {
  st_sellpointtype: string;
}
export default class SellpointType extends Entity {
  st_sellpointtype: string;
  constructor(params: ISellpointTypeParams) {
    super(params);
    this.st_sellpointtype = params.st_sellpointtype;
  }
}
