import Entity, { IEnttityParams } from "./entity";

export interface ISellParams extends IEnttityParams {
  fk_sellpoint: string;
  fk_product: string;
  nm_value: number;
}
export default class Sell extends Entity {
  fk_sellpoint: string;
  fk_product: string;
  nm_value: number;
  constructor(params: ISellParams) {
    super(params);
    this.fk_sellpoint = params.fk_sellpoint;
    this.fk_product = params.fk_product;
    this.nm_value = params.nm_value;
  }
}
